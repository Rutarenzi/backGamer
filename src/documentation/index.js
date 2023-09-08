import { Router } from "express";
import { serve, setup } from "swagger-ui-express";
import dotenv from "dotenv";

const docrouter = Router();
dotenv.config();
const host = process.env.SWAGGER_URL;
 const options = {
    openapi: "3.0.0",
    info: {
        title: "Boilerplate Renzi",
        version: "1.0.0",
        description: "Boilerplate Renzi",
    },
    servers: [
        {
            url : host,
        },
    ],
    basePath: "/",
    security: [
        {
            bearerAuth: [],
        },
    ],
    tags: [],
    paths: {
        "/": {
            get: {
                tags: ["Homepage"],
                description: "Welcome",
                security: [{ bearerAuth: []}],
                responses: {
                    200: {
                        description: "Successfully",
                    },
                },
            },

        },
        "/users/register": {
            post: {
              tags: ["User"],
              description: "User register",
              requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/register",
                        },
                    },
                },
              },
              responses: {
                201: {
                    description: "Successfully",
                },
                400: {
                    description: "Bad request",
                },
                409: {
                    description: "referrer not exist or user exist"
                },
              },
            },
        },
        "/users/login": {
            post: {
              tags: ["User"],
              description: "Login user",
              requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/login",
                        },
                    },
                },
              },
              responses: {
                200: {
                    description: "Login in successfully",
                },
                404: {
                    description: "User Not Exist",
                },
                400: {
                    description: "Bad Request!",
                },
              },
            },
        },
        "/payment/estimate": {
            post: {
                tags: ["Payment"],
                description: "get estimated in usd",
                security: [{ bearerAuth: []}],
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/pEstimate"
                            },
                        },

                    },
                },
                responses: {
                    200: {
                        descripiton: "deposit in usd"
                    },
                    401: {
                        description: "Authorized"
                    },

                },
            },
        },
        "/payment": {
            post: {
                tags: ["Payment"],
                description: "initiate payment",
                security: [{ bearerAuth: []}],
                requestBody: {
                    required: true,
                    content: {
                        "application/json":{
                            schema: {
                                $ref: "#/components/schemas/payment"
                            },
                        },

                    },
                },
                responses:{
                    200: {
                        description: "payment initiated successfully"
                    },
                    401: {
                        description: "you are Authorized"
                    },
                },

            },
            get: {
                tags: ["Payment"],
                description: "get accepted currency",
                security: [{ bearerAuth: []}],
                responses: {
                    200: {
                        description: "available currency"
                    },
                    404: {
                        description: "please login"
                    },
                },
            },
        },
        "/level": {
            get: {
                tags: ["Level"],
                description: "get all level",
                security: [{ bearerAuth: []}],
                responses: {
                    200: {
                        description: "available level"
                    },
                },
            },
        },
        "/level/:id": {
            get: {
                tags: ["Level"],
                description: "get one level",
                security: [{ bearerAuth: []}],
                parameters: [
                    {
                        name:"id",
                        in: "path",
                        description: "level id",
                        required: true,
                        schema: {
                            type: "number",
                            format: "number",
                        },
                    },
                ],
                responses: {
                     200: {
                        description: "successfully",
                     }
                },
            },
        },
        "/comss":{
            get: {
                tags: ["commission"],
                description: "calculate commission",
                security: [{ bearerAuth: []}],
                responses: {
                    200: {
                        description: "successfully"
                    },
                    401: {
                        description: "authorized"
                    }
                }
            }
        }
    
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
        schemas: {
            register: {
                type: "object",
                properties: {
                    username: {
                        type: "string",
                        required: true,
                        description: "Username of User"
                    },
                    fullname: {
                        type: "string",
                        required: true,
                        description: "Full name of User"
                    },
                    phone: {
                        type: "string",
                        required: true,
                        description: "Phone of User"
                    },
                    whatsapp: {
                        type: "string",
                        required: true,
                        descrition: "whatsapp of User"
                    },
                    referrer: {
                        type: "string",
                        required: true,
                        description: "referal code"
                    },
                    password: {
                        type: "string",
                        required: true,
                        description: "password of the user"
                    },
                },
                example: {
                    username: "Jane56",
                    fullname: "Jane doe",
                    phone: "+24507987878",
                    whatsapp: "+24507987878",
                    referrer: "ref787",
                    password: "default2" 
                }

            },
            login: {
                type: "object",
                properties: {
                    username: "string",
                    password: "string",
                },
                example:{
                     username: "christiano12",
                     password: "default",
                },
            },
            payment: {
                type: "object",
                properties: {
                    price: {
                        type: "float",
                        required: true,
                        description :"deposit in usd"
                    },
                    pay: {
                        type: "float",
                        required: true,
                        description: "deposit in usdt"
                    },
                },
                example: {
                    price: 450.67,
                    pay: 451.41999945,
                }
            },
            pEstimate: {
                type: "object",
                properties: {
                    price: {
                        type: "float"
                    }
                },
                example: {
                    price: 450.0
                }
            }
        },
    },
 }

 docrouter.use("/", serve, setup(options));
 export default docrouter;