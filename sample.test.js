const servers = require("./server"); 
const request = require("supertest");
const db = require("./app/models/")
const MalwareURL = db.testDB.malware;
const Op = db.testDB.Sequelize.Op;


describe('test that get route is working for all instances of serever', () => {
    beforeAll(() => {

    });

    it('should give status 200 if route exists for port 100', async () => {
        const res =  await request(servers.app)
            .get("/urlinfo/1/:hostname/*");
        expect(res.statusCode).toEqual(200);
    });

    it('should give status 200 if route exists for port 800', async () => {
        const res = await request(servers.app2)
            .get("/urlinfo/1/:hostname/*");
        expect(res.statusCode).toEqual(200)
    });

    it('should give status 200 if route exists for port 800', async () => {
        const res = await request(servers.app3)
            .get("/urlinfo/1/:hostname/*");
        expect(res.statusCode).toEqual(200)
    });

    it('should give status 200 if route exists for port 800', async () => {
        const res = await request(servers.proxyApp)
            .get("/urlinfo/1/:hostname/*");
        expect(res.statusCode).toEqual(200)
    });
});


describe("testing that proxy app is send request to different servers",() => {


    it("the server should return host for the server", async () => {
        const { body } = await request(servers.proxyApp) 
            .get("/urlinfo/1/www.facebook.com")
        const serverHosts = ['localhost:9000', 'localhost:1000', 'localhost:8000'];
        const exists = serverHosts.includes(body.serverHost);
        expect(exists).toBeTruthy();
    })

})


// need to make test database 
describe("test database create and fetch data", () => {

    it("the res body should return json object indicate that the url is not safe if exists in database", async () => {

        const { body } = await request(servers.proxyApp)
            .get("/urlinfo/1/www.facebook.com")
        expect(body.message).toEqual('URL is not safe to visit');

    });


    it("the res body should return json object indicate that the url is safe if exists in database", async () => {
        const { body } = await request(servers.proxyApp)
            .get("/urlinfo/1/www.example.com")
        expect(body.message).toEqual('URL is safe to be visit');
    });
})







