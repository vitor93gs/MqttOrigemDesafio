var mqtt = require('mqtt');

var options = {
	host: '4e3fabb95a98476e92aec3ac8c3b22ac.s1.eu.hivemq.cloud',
	port: 8883,
	protocol: 'mqtts',
	username: 'Origem',
	password: 'Senha@Segura01',
};

//initialize the MQTT client
var client = mqtt.connect(options);

//setup the callbacks
client.on('connect', function () {
	console.log('Connected');
});

client.on('error', function (error) {
	console.log(error);
});

// const newConnection = 'toggleBike';
// client.subscribe(newConnection);

var Battery = {
	Id: 0,
	SOC: '45%',
};

var Bike = {
	chassi: '',
	battery: true,
	fabric: 'Romenia',
};

var crypto = require('crypto');
var chassi = crypto.randomBytes(7).toString('hex');
Bike.chassi = chassi;

var idBattery = parseInt(Math.random() * 1000000, 10);
Battery.Id = idBattery;

Bike.battery ? (Bike.batteryInfo = Battery) : null;

client.on('message', function (topic, message) {
	//Called each time a message is received
	console.log('Received message:', topic, message.toString());
});

Bike.state === 'on'
	? client.publish(`bike/telemetry/${chassi}`, JSON.stringify(Bike))
	: null;
