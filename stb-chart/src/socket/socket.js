var websock = null;

var host = 'localhost:3002/sockets/chat';
var userWord = [];

function requireUserWord() {
	return userWord
}
function initWebSocket(user) {
	var wsuri = 'ws://' + host;
	websock = new WebSocket(wsuri, user);

	websock.onmessage = function (e) {
		console.log('接收的数据为：', e.data);
		userWord.push(e.data)
	};

	websock.onclose = function (e) {
		websocketclose(e);
	};

	websock.onopen = function () {
		websocketOpen();
	};

	//连接发生错误的回调方法
	websock.onerror = function () {
		console.log('WebSocket连接发生错误');
	};
}

// 实际调用的方法
function sendSock(agentData) {
	if (websock.readyState === websock.OPEN) {
		//若是ws开启状态
		websocketsend(agentData);
	} else if (websock.readyState === websock.CONNECTING) {
		// 若是 正在开启状态，则等待1s后重新调用
		setTimeout(function () {
			sendSock(agentData);
		}, 1000);
	} else {
		// 若未开启 ，则等待1s后重新调用
		setTimeout(function () {
			sendSock(agentData);
		}, 1000);
	}
}

//数据发送
function websocketsend(agentData) {
	websock.send(JSON.stringify(agentData));
}

//关闭
function websocketclose(e) {
	console.log('connection closed (' + e.code + ')');
}

function websocketOpen() {
	console.log('连接成功');
}

// initWebSocket();

export { initWebSocket, sendSock, requireUserWord };
