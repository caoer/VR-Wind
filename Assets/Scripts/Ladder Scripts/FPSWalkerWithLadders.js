var speed = 6.0;
var jumpSpeed = 8.0;
var gravity = 20.0;

private var moveDirection = Vector3.zero;
private var grounded : boolean = false;
private var motor : CharacterMotor;

// *** Added for UseLadder ***
private var mainCamera : GameObject = null;
private var controller : CharacterController = null;
private var onLadder = false;
var ladderHopSpeed = 6.0;

function Start () {
	mainCamera = GameObject.FindWithTag("MainCamera");
	controller = GetComponent(CharacterController);
	motor = GetComponent(CharacterMotor);
}

function FixedUpdate() {
	
	// *** Added for UseLadder ***
	// If we are on the ladder, let the ladder code take over and handle FixedUpdate calls.
	if(onLadder) {
		Debug.Log("On Ladder");
		gameObject.SendMessage("LadderFixedUpdate", null, SendMessageOptions.RequireReceiver);
		return;
	}
	// ***
	
	//if (grounded) {
	//if (true) {
		// We are grounded, so recalculate movedirection directly from axes
		moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
		moveDirection = transform.TransformDirection(moveDirection);
		moveDirection *= speed;
		
		if (Input.GetButton ("MoveUp")) {
			moveDirection.y = jumpSpeed;
		}
		else if (Input.GetButton("MoveDown")) {
			moveDirection.y = -jumpSpeed;
		}
	

	// Apply gravity
	moveDirection.y -= gravity * Time.deltaTime;
	
	// Move the controller
	var flags = controller.Move(moveDirection * Time.deltaTime);
	grounded = (flags & CollisionFlags.CollidedBelow) != 0;

//		var directionVector = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
//	if (directionVector != Vector3.zero) {
//		// Get the length of the directon vector and then normalize it
//		// Dividing by the length is cheaper than normalizing when we already have the length anyway
//		var directionLength = directionVector.magnitude;
//		directionVector = directionVector / directionLength;
//		
//		// Make sure the length is no bigger than 1
//		directionLength = Mathf.Min(1, directionLength);
//		
//		// Make the input vector more sensitive towards the extremes and less sensitive in the middle
//		// This makes it easier to control slow speeds when using analog sticks
//		directionLength = directionLength * directionLength;
//		
//		// Multiply the normalized direction vector by the modified length
//		directionVector = directionVector * directionLength;
//	}
//	
//	// Apply the direction to the CharacterMotor
//	motor.inputMoveDirection = transform.rotation * directionVector;
//	motor.inputJump = Input.GetButton("Jump");
}

// *** Added for UseLadder ***
function OnLadder () {
	onLadder = true;
	moveDirection = Vector3.zero;
}

function OffLadder (ladderMovement) {
	onLadder = false;
	
	// perform off-ladder hop
	var hop : Vector3 = mainCamera.transform.forward;
	hop = transform.TransformDirection(hop);
	moveDirection = (ladderMovement.normalized + hop.normalized) * ladderHopSpeed;
}
// ***
@script RequireComponent (CharacterMotor)
@script RequireComponent(CharacterController)