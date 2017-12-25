const LineConnect = require('./connect');
let LINE = require('./main.js');

const auth = {
	authToken:'EooTJvrRSwVvtHHNOF1c.BEl9dt8wGdIbrthb/4/33a.ywuRZ5O2ag5r3pizKF7MiGWnwVqXumNdODslTlROZ+o=',
	certificate:'fe0261a0b2d26a396495805608b6b01e38ab0f75b7e3b1c660e0b8d0416b1ebd',
}
 let client =  new LineConnect(auth);
//let client =  new LineConnect();

client.startx().then(async (res) => {
	
	while(true) {
		try {
			ops = await client.fetchOps(res.operation.revision);
		} catch(error) {
			console.log('error',error)
		}
		for (let op in ops) {
			if(ops[op].revision.toString() != -1){
				res.operation.revision = ops[op].revision;
				LINE.poll(ops[op])
			}
		}
	}
});
