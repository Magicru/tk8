let chai = require('chai');
let { expect } = chai;
let should = chai.should();

chai.use(require('chai-http'));
chai.use(require('chai-match'));

const server = 'http://0.0.0.0:33722';

describe('Testing API', () => {
  describe('/GET about', () => {
    it('should be text/html', (done) => {
      chai.request(server)
        .get('/about')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.header('content-type', 'text/html');
          done()
        });
    });
  });
    //订阅
  describe('/GET root', () => {
    it('should be a number', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          console.log('res.text =>>', res.text)
          res.text.should.match(/^\d+$/);
          done()
        });
    });
  });

  describe('/GET stat', () => {
    it('should be number', (done) => {
      chai.request(server)
        .get('/stat')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.match(/^\d+$/);
          done()
        });
    });

    it('should increase number', (done) => {
      let number = 0;
      chai.request(server)
        .get('/stat')
        .end((err, res) => {
          res.should.have.status(200);
          res.text.should.match(/^\d+$/);
          number = Number(res.text);
          chai.request(server)
            .get('/stat')
            .end((err, res) => {
              res.should.have.status(200);
              res.text.should.match(/^\d+$/);
              let secondNumber = Number(res.text);
              expect(secondNumber).to.be.greaterThan(number);
            });
          done();
        });
    })
  });
})