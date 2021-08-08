const servers = require("./server"); 
const request = require("supertest");
const db = require("./app/models/")
const MalwareURL = db.malware;
const Op = db.Sequelize.Op;


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

    beforeAll(() => {
        
    });

    it("the request url should equal to one of the server ports", async () => {
        const {body}  =  await request(servers.proxyApp)
            .get("/urlinfo/1/www.facebook.com")
             expect(body).toEqual({
                 message: 'URL is not safe to visit',
                 hostname: "www.facebook.com",
                 path: "",
                 port: "",
                 url: "www.facebook.com",
                 queryString: {},
             });

    });

})






