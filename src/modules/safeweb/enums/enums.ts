enum urlSafeWeb {
    PWD_AUTHORIZE = 'https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/pwd_authorize',
    AUTHORIZE_CA = 'https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/authorize-ca',
    START_SIGNATURE = 'https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/pades-signature/start',
    APPLY_STAMP = 'https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/pades-signature/apply',
    FINISH_SIGNATURE = 'https://pscsafeweb.safewebpss.com.br/Service/Microservice/OAuth/api/v0/oauth/pades-signature/finish'
}

const fixedCredentialsHolder = {
    scope: "signature_session",
    lifetime: 604800, // seven days in seconds
    grant_type: "password"
}

const prescriptionCoordinates = {
    "x": 125.261064,
    "y": 81.005527,
    "width": 155.2387600,
    "height": 77.6193800
}

export { urlSafeWeb, fixedCredentialsHolder, prescriptionCoordinates };

