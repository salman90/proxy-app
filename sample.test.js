const servers = require("./server"); 
const request = require("supertest");




describe('first test', () => {
    beforeAll(() => {

    });

    it('should give not found it data does not exist', async () => {
        const res =  await request(servers.app)
            .get("/urlinfo/1/:hostname/*");

        expect(res.statusCode).toEqual(200);
    })
});