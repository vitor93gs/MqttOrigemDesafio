var mqtt = require('mqtt');
require('dotenv').config();

var options = {
	host: process.env.MQTT_HOST,
	port: process.env.MQTT_PORT,
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

const newConnection = 'bike/telemetry/#';
client.subscribe(newConnection);

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

client.publish(`bike/telemetry/${chassi}`, JSON.stringify(Bike));
