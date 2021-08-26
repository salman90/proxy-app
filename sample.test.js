const servers = require("./server");
const request = require("supertest");
const db = require("./app/models/")
// const MalwareURL = db.testDB.malware;
// const Op = db.testDB.Sequelize.Op;


describe('test that routes for serever', () => {
    beforeAll(async () => {
        await db.testDB.sequelize.sync({force: true});
    });

    test('creates a recored in database', async () => {
        expect.assertions(1);
        const malware = await db.testDB.malware.create({
            id: 1,
            address: 'www.example.com'
        })
        expect(malware.id).toEqual(1);
    });


    test("get url ", async () => {
        expect.assertions(1);
        const malware = await db.testDB.malware.findOne({ where: { address: 'www.example.com'} })
        expect(malware.address).toEqual('www.example.com');
    })

    it('should give status 200 if route exists for port 100', async () => {
        const res = await request(servers.app)
            .get("/urlinfo/1/:hostname/*");
        expect(res.statusCode).toEqual(200);
    });


    afterAll(async () => {
        await db.DevDB.sequelize.close();
    });

});


// describe('test routes', () => {
//     it('should give status 200 if route exists for port 100', async () => {
//         const res = await request(servers.app)
//             .get("/urlinfo/1/:hostname/*");
//                 expect(res.statusCode).toEqual(200);
//     });

// });