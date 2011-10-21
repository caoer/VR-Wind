using UnityEngine;
using System.Collections;

public class MyGUIScript :MonoBehaviour {

    private int kOffsetY = 20;
    public static bool shouldMouseLookEnable;
    public float[] sliderValue;
    public float[] redSliderValue;
    public GameObject[] alphaSliderGameObject;
    public GameObject[] redSliderGameObject;

    public GameObject gearBoxObject;
    public GameObject bladeObject;
    void Start () {
        sliderValue = new float[alphaSliderGameObject.Length];
        for (int i = 0;i < sliderValue.Length;i++) {
            sliderValue[i] = 1;
        }

        redSliderValue = new float[redSliderGameObject.Length];
        for (int i = 0;i < redSliderValue.Length;i++) {
            redSliderValue[i] = 0;
        }

        GameObject[] bladesAnimation = GameObject.FindGameObjectsWithTag("blades");
        for (int i = 0;i < bladesAnimation.Length; i ++) {
            GameObject bladeO = bladesAnimation[i];
            bladeO.animation.Stop();
            Debug.Log("clear");
            StartCoroutine(resetAnimation(bladeO));
        }
        
    }

    IEnumerator resetAnimation(GameObject bladeAnimation) {
        yield return new WaitForSeconds(Random.value * 5);
        bladeAnimation.animation.Play();

    }
    void Update() {
        if (Input.GetButtonDown("toogleMouse")) {
            shouldMouseLookEnable = !shouldMouseLookEnable;
        }
        for (int i = 0;i < sliderValue.Length; i ++) {
            this.changeAlpha(alphaSliderGameObject[i], sliderValue[i]);
        }

        for (int i = 0;i < redSliderValue.Length;i++){
            if (redSliderValue[i] == 0)
            {
                redSliderGameObject[i].renderer.material.color = Color.white;
            }
            else {
                redSliderGameObject[i].renderer.material.color = new Color(redSliderValue[i],0,0,1);
            }
            
        }
    }

    void changeAlpha(GameObject g, float alpha) {
        Color oColor = g.renderer.material.color;
        oColor.a = alpha;
        g.renderer.material.color = oColor;
    }
    
    void OnGUI() {
//        
        if (shouldMouseLookEnable)
        {
            return;
        }
        // Make a group on the center of the screen
        GUI.BeginGroup(new Rect(25 ,25 , 200, 400));
        GUI.Box(new Rect(0, 0, 200, 400), "Change Opacity");
        

//         GUI.Label(new Rect(5, 20, 40, 30), "Blade1");
//         hSliderValue = GUI.HorizontalSlider(new Rect(45, 25, 100, 30), hSliderValue, 0.0f, 1.0f);
// 
//         GUI.Label(new Rect(5, 20+kOffsetY, 40, 30), "Blade2");
//         hSliderValue = GUI.HorizontalSlider(new Rect(45, 25+kOffsetY, 100, 30), hSliderValue, 0.0f, 1.0f);
//    
//         GUI.Label(new Rect(5, 20 + kOffsetY*2, 40, 30), "Blade3");
//         hSliderValue = GUI.HorizontalSlider(new Rect(45, 25 + kOffsetY*2, 100, 30), hSliderValue, 0.0f, 1.0f);

        for (int i =0;i < alphaSliderGameObject.Length; i ++) {
            GameObject aObject = alphaSliderGameObject[i];
            GUI.Label(new Rect(5, 20 + kOffsetY * i, 90, 30), aObject.name);
            sliderValue[i] = GUI.HorizontalSlider(new Rect(95, 25 + kOffsetY * i, 100, 30), sliderValue[i], 0.0f, 1.0f);
        }

        GUI.Label(new Rect(50, 20 + kOffsetY * alphaSliderGameObject.Length, 90, 30), "Show Detail");

        for (int i =0;i < redSliderGameObject.Length;i++) {
            GameObject aObject = redSliderGameObject[i];
            GUI.Label(new Rect(5, 20 + kOffsetY * (i + alphaSliderGameObject.Length + 1), 90, 30), aObject.name);
            redSliderValue[i] = GUI.HorizontalSlider(new Rect(95, 25 + kOffsetY * (i +  alphaSliderGameObject.Length + 1), 100, 30), redSliderValue[i], 0.0f, 1.0f);
        }

        if (GUILayout.Button("Hide")){
            shouldMouseLookEnable = true;
        }
        
        if (GUI.Button (new Rect(25,200,150,30),"Toggle GearBox"))
        {
            if (gearBoxObject.animation.isPlaying) {
                gearBoxObject.animation.Stop();
            }
            else {
                gearBoxObject.animation.Play();
            }
        }

        if (GUI.Button(new Rect(25, 240, 150, 30), "Toggle Blades")) {
            if (bladeObject.animation.isPlaying) {
                bladeObject.animation.Stop();
            }
            else {
                bladeObject.animation.Play();
            }
        }
        GUI.EndGroup();
    }


}