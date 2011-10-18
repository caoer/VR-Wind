/*

var climbDirection : Vector3 = Vector3.zero;
var lateralMove : Vector3 = Vector3.zero;
static var ladderMovement : Vector3 = Vector3.zero;
var climbSpeed = 6.0;
var ladderLeftRight : Vector3 = Vector3.zero;

var waypoints : GameObject[];
var waypointCount;
var currentWaypoint : GameObject = null;
var nextWaypoint : GameObject = null;

var currentLadder : Ladder = null;
var entrenceCollider : Collider = null;
var latchedToLadder : boolean = false;
var reverse : boolean = false;

var inMotionControl : boolean = false;

var speedScaleFactor = 0.0;

private var mainCamera : GameObject = null;
private var controller : CharacterController = null;

function Start () {
	mainCamera = GameObject.FindWithTag("MainCamera");
	controller = GetComponent(CharacterController);
}

function OnTriggerEnter (other : Collider) {
	if(!latchedToLadder && (other.tag == "LadderStart" || other.tag == "LadderEnd")) {
		entrenceCollider = other;
		return;
	}
	
	if(other.tag == "Ladder") {		
		// begin using the ladder
		LatchLadder(other.gameObject, other);
	}
}

function OnTriggerExit (other : Collider) {		
	// exit ladder
	if(other.tag == "Ladder") {
		// exit the ladder
		UnlatchLadder();
	}
}

function LatchLadder (latchedLadder : GameObject, collisionWaypoint : Collider) {
	// typecast the latchedLadder as a Ladder object from GameObject
	currentLadder = latchedLadder.GetComponent(Ladder);
	latchedToLadder = true;
	
	// turn off collisions with the ladder itself
	//collider.isTrigger = true;
			
	// collect the list of waypoints from the ladder
	waypoints = currentLadder.waypoints;
	waypointCount = waypoints.Length;

	reverse = (entrenceCollider.tag == "LadderStart") ? false : true;
	
	if(!reverse) {
		reverse = false;
		currentWaypoint = waypoints[0];
		nextWaypoint = waypoints[1];
	} else {
		reverse = true;
		currentWaypoint = waypoints[waypointCount - 1];
		nextWaypoint = waypoints[waypointCount - 2];
	}
	
	// let the other scripts know we are on the ladder now
	gameObject.SendMessage("OnLadder", null, SendMessageOptions.RequireReceiver);
}

function UnlatchLadder () {
	latchedToLadder = false;
	currentLadder = null;
	
	// turn ladder collisions back on
	//collider.isTrigger = false;
	
	// let the other scripts know we are off the ladder now
	gameObject.SendMessage("OffLadder", ladderMovement, SendMessageOptions.RequireReceiver);
	
	inMotionControl = false;
}

function LadderFixedUpdate () {
	
	// If we jumpped, then revert back to the original behavior
	if (Input.GetButton("Jump")) {
		UnlatchLadder();
		gameObject.SendMessage("FixedUpdate", null, SendMessageOptions.RequireReceiver);
	}
	
	inMotionControl = true;
	
	// find the vector between the current and next waypoint and normalize
	climbDirection = nextWaypoint.transform.position -  currentWaypoint.transform.position;
	climbDirection.Normalize();
	climbDirection *= (reverse) ? -1 : 1;
	
	// get the vector into the ladder
	//var intoWallAxis : Vector3 = currentLadder.IntoWallVector();
	
	// set speed and direction
	climbDirection *= Input.GetAxis("Vertical") * climbSpeed;
	
	// find lateral component of forward motion
	ladderLeftRight = currentLadder.LadderLeftRight();
	
	lateralMove = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
	lateralMove.Normalize();
	
	lateralMove = transform.TransformDirection(lateralMove);
	lateralMove = Vector3.Dot(lateralMove, ladderLeftRight) * ladderLeftRight;
	lateralMove *= climbSpeed;
	
	ladderMovement = climbDirection + lateralMove;
	
	// Move the controller
	var flags = controller.Move(ladderMovement * Time.deltaTime);
}

@script RequireComponent(CharacterController)

*/