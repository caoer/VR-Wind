using UnityEngine;
using System.Collections;

public class CollisionDetect: MonoBehaviour {


	public int rayCastDistance = 5;
	// Update is called once per frame
	void Update () {
		RaycastHit hit;
		
		if (Physics.Raycast(transform.position, transform.forward, out hit, rayCastDistance)) {
			if(hit.collider.gameObject.tag == "door") {
				hit.collider.gameObject.animation.Play("door_open");
			}
		}
	}
}
