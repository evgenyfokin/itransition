import { createServer, Model, RestSerializer } from "miragejs";
import faker from 'faker';
import { addErrorsToData } from './utils';

export function makeServer({ environment = "test" } = {}) {
    let server = createServer({
        environment,

        models: {
            user: Model,
        },

        serializers: {
            application: RestSerializer,
        },

        routes() {
            this.namespace = "api";

            this.get("/data", (schema, request) => {
                const params = request.queryParams;
                const region = params.region || 'en';
                const errors = Number(params.errors) || 0;
                const seed = Number(params.seed) || 0;
                const page = Number(params.page) || 1;

                faker.locale = region;
                faker.seed(seed + page);

                let data = Array.from({ length: 20 }, (_, i) => {
                    const id = faker.datatype.uuid();
                    const name = faker.name.findName();
                    const address = faker.address.streetAddress();
                    const phone = faker.phone.phoneNumber();

                    return {
                        id,
                        name,
                        address,
                        phone,
                    };
                });



                return data;
            });
        },

        seeds(server) {
            server.createList("user", 200);
        },
    });

    return server;
}