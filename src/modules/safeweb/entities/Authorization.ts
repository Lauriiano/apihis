import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity("authorization_safeweb")
class Authorization {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    identifierCA: string;
    @Column()
    state: string;
    @Column()
    expirationDate: string;
    @Column()
    serialNumber: string;
    @Column()
    cpf: string;
    @Column()
    status: number;
    @CreateDateColumn()
    created_at: Date;
}

export { Authorization };

