/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
		// alert('start');
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
		// alert('device ready');
        console.log('Received Device Ready Event');
        console.log('calling setup push');
        app.setupPush();
    },
    setupPush: function() {
        FCMPlugin.getToken(
			function (token) {
				$.get('https://api.thingspeak.com/update?api_key=I3DW8PXUG00YOHNH&field1='+token, function( data ) {
					// alert("FCM token sent");
				});
			},
			function (err) {
				alert("Error: " + 'error retrieving token: ' + err);
			}
        );

        FCMPlugin.onNotification(function(data){
				$("#motion").attr("src","images/crawling.svg");
				var now = new Date();
				$("#active").text("Wykryto ruch");
				$("#active").text(now.getHours()+':'+now.getMinutes()+':'+now.getSeconds());
				setTimeout(function(){ $("#motion").attr("src","images/sleeping.svg"); $("#active").text("Dziecko śpi"); }, 10000);
			},
        
			function(msg){
				// alert('onNotification callback successfully registered: ' + msg);
			},
            function(err){
				// alert('Error registering onNotification callback: ' + err);
            }
        );
    }
};
