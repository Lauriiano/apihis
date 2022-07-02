import fetch from 'node-fetch';

interface IRequestSafeWeb {
    body?: any
    method: string;
    url: string;
}

class Safewebapi {

    private token: string = "";

    async executeRequest(data: IRequestSafeWeb): Promise<any> {

        const main = this.main(data);

        const req = await fetch(data.url, main);
        const json = await req.json();

        return json;

    }

    public setToken(token: string): void {
        this.token = token;
    }

    private main({ body, method }: IRequestSafeWeb) {
        const main = {
            method,
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${this.token}`
            }
        }

        if (method == "GET") {
            delete main.body
        }

        return main;
    }

}

export { Safewebapi };

