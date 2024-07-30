// Required
// TODO: Enable audio
// TODO: Image upload + Enable high image resolution + Scale images setting
// reconnect and continue session
// need to add back login challenge

// UI/UX Improvements
// TODO: Add session replay (session replay speed parameter as well) - set animation when getting permalink - set animation speed in sidebarv

// Code Maintenance
// TODO: Comment/clean code and upload to github
// TODO: Add debugging/logging for function calls

// Interface Improvements
// TODO: Code blocks should also show on user inputs

// Bonus
// TODO: Add token statistic logging
// TODO: add default modules/functions
// TODO: assistant creation file upload
// TODO: Make input area resizable
// TODO: Message level permalinks do not resolve to the specified message
// TODO: Fix file upload overflow + File upload images depending on file type
// TODO: Highlight text as blue when copied

var pageUrl = new URL(window.location);
var targetHost = typeof(httpServer) != 'undefined' ? new URL(httpServer).host : pageUrl.host;
var getMessageText, sendMessage, onOpen, onMessage, onError, onClose, webSocket, readMessage;
var httpBase = 'https://' + targetHost;
var wsApiUrl = typeof(wsServer) != 'undefined' ? wsServer : 'wss://' + targetHost + '/ws/assistant';
var vadVersion = typeof(vad_version) != 'undefined' ? vad_version : '';
var authType = typeof(authenticationType) != 'undefined' ? authenticationType : 'DPoP';
var authClient = solidClientAuthentication.default;
var wsUrl = new URL(wsApiUrl); /* WebSockets endpoint */
var currentThread = null;
var currentAssistant = undefined;
var currentAssistantName = undefined;
var currentModel = undefined;
var temperature = 0.2;
var top_p = 0.5;
var max_tokens = 4096;
var max_threads = 500;
var receivingMessage = null; /* this is not null when receiving response, keeps object which present current answer */
var enabledFunctions = [];
var markdown_content = '';
var loggedIn = false;
var apiKeyRequired = true;
var apiKey = null;
var session = authClient.getDefaultSession();
var pageParams = new URLSearchParams(pageUrl.search);
var importedSession = undefined;
var sharedSession = pageParams.get('share_id');
var sharedSessionAnimation = parseInt(pageParams.get('t')) || 0;
var sharedItem = pageUrl.hash;
let mediaRecorder = undefined;
let recodingTimeout = null;
var storageFolder = null;
var logoutOnError = false;
var chatSessionTimeoutMsec = typeof (chatSessionTimeout) != 'undefined' ? chatSessionTimeout * 1000 : -1;
var animate_session = parseInt(pageParams.get('t')) || 0;
var assistants = [];
var models = [];

// DOMContentLoaded Event Listener
document.addEventListener("DOMContentLoaded", function() {
    // UI Initialization and Event Handlers
    initUI();
    
    // Init logic to handle files uploads
    initFiles();

    // Initialization of Authentication Event Handlers
    initAuthentication();
});