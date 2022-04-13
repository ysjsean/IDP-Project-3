package com.example.Questionator;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class E_AnswerOptionActivity extends AppCompatActivity implements AsyncResponse
{
    //private TextView txtTimer;
    private TextView qnNumber;
    private TextView qnDescription;
    private Button optionA;
    private Button optionB;
    private Button optionC;
    private Button optionD;
    private Button btnNextQns;

    String selectedChoice;

    long currentQuestion;
    String session_id;
    int question_id;
    String isCorrect;
    long score;
    long user_id;

    HttpTask httpTask = new HttpTask();

//    String qnNumber, qnDesc, optionA = "", optionB = "", optionC = "", optionD = "";

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.e_student_ans_option_page);

        //txtTimer = (TextView)  findViewById(R.id.txtTimer);
        final SharedPreferences prefs = getSharedPreferences("current", MODE_PRIVATE);
        final SharedPreferences profileprefs = getSharedPreferences("profile", MODE_PRIVATE);
        currentQuestion = prefs.getLong("currentQuestionNo", 0);
        session_id = prefs.getString("session_id", "");
        score = prefs.getLong("totalScore", 0);
        user_id = profileprefs.getLong("userid:", 0);
        Log.d("currentQuestion: ", " " + currentQuestion);
        httpTask.delegate = this;

        optionA = (Button) findViewById(R.id.btnA);
        optionB = (Button) findViewById(R.id.btnB);
        optionC = (Button) findViewById(R.id.btnC);
        optionD = (Button) findViewById(R.id.btnD);
        btnNextQns = (Button) findViewById(R.id.btnNextQns);
        qnNumber = (TextView) findViewById(R.id.qnNumber);
        qnDescription = (TextView) findViewById(R.id.qnDescription);

        optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
        optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
        optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
        optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));

        btnNextQns.setEnabled(false);
        btnNextQns.setVisibility(View.GONE);

        if(getIntent().hasExtra("qnNumberTag") && getIntent().hasExtra("qnDescTag")
        && getIntent().hasExtra("optionATag") && getIntent().hasExtra("optionBTag")
        && getIntent().hasExtra("optionCTag") && getIntent().hasExtra("optionDTag")
        && getIntent().hasExtra("isCorrect")) {
            qnNumber.setText("" +currentQuestion);
            qnDescription.setText(getIntent().getStringExtra("qnDescTag"));
            optionA.setText(getIntent().getStringExtra("optionATag"));
            optionB.setText(getIntent().getStringExtra("optionBTag"));
            optionC.setText(getIntent().getStringExtra("optionCTag"));
            optionD.setText(getIntent().getStringExtra("optionDTag"));
            question_id = getIntent().getIntExtra("question_id", 0);
            isCorrect = getIntent().getStringExtra("isCorrect");
//            topic_id = getIntent().getIntExtra("topic_id", -1);
        }

        optionA.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

//                optionA.setBackground(getResources().getDrawable(R.color.black));
//                optionA.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderA = new ShapeDrawable();
                borderA.setShape(new RectShape());
                borderA.getPaint().setColor(Color.RED);
                borderA.getPaint().setStrokeWidth(30f);
                borderA.getPaint().setStyle(Paint.Style.STROKE);
                optionA.setBackground(borderA);*/
                selectedChoice = "A";
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design_pressed));
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));
                btnNextQns.setEnabled(true);
                btnNextQns.setVisibility(View.VISIBLE);
            }
        });

        optionB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionB.setBackground(getResources().getDrawable(R.color.black));
//                optionB.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderB = new ShapeDrawable();
                borderB.setShape(new RectShape());
                borderB.getPaint().setColor(Color.BLUE);
                borderB.getPaint().setStrokeWidth(30f);
                borderB.getPaint().setStyle(Paint.Style.STROKE);
                optionB.setBackground(borderB);*/
                selectedChoice = "B";
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design_pressed));
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));
                btnNextQns.setEnabled(true);
                btnNextQns.setVisibility(View.VISIBLE);
            }
        });

        optionC.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionC.setBackground(getResources().getDrawable(R.color.black));
//                optionC.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderC = new ShapeDrawable();
                borderC.setShape(new RectShape());
                borderC.getPaint().setColor(Color.GREEN);
                borderC.getPaint().setStrokeWidth(30f);
                borderC.getPaint().setStyle(Paint.Style.STROKE);
                optionC.setBackground(borderC);*/
                selectedChoice = "C";
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design_pressed));
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));
                btnNextQns.setEnabled(true);
                btnNextQns.setVisibility(View.VISIBLE);
            }
        });

        optionD.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionD.setBackground(getResources().getDrawable(R.color.black));
//                optionD.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderD = new ShapeDrawable();
                borderD.setShape(new RectShape());
                borderD.getPaint().setColor(Color.YELLOW);
                borderD.getPaint().setStrokeWidth(30f);
                borderD.getPaint().setStyle(Paint.Style.STROKE);
                optionD.setBackground(borderD);*/
                selectedChoice = "D";
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design_pressed));
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
                btnNextQns.setEnabled(true);
                btnNextQns.setVisibility(View.VISIBLE);
            }
        });

        btnNextQns.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                onUpdate();
                String url = String.format("%s/api/responses/insert/%d/%d/%s/%s/", getResources().getString(R.string.api_url), question_id, user_id, selectedChoice, session_id);
                Log.d("URL: ", url);
                httpTask.execute(url);
//                onFinish();
//               String url = String.format("%s/api/questions/%s/question/%d", getResources().getString(R.string.api_url), session_id, currentQuestion);
//            httpTask.execute(url);
            }
        });

        /*new CountDownTimer(10000, 1000)
        {
            public void onTick(long millisRemaining)
            {
                txtTimer.setText(""+millisRemaining / 1000);
            }

            @Override
            public void onFinish() {
//                onFinish();
                String url = String.format("%s/api/questions/%s/question/%d", getResources().getString(R.string.api_url), session_id, currentQuestion);
                httpTask.execute(url);
            }
        }.start();*/
    }

    private void repeat(JSONArray jsonArray) throws JSONException {
        httpTask.cancel(true);
        onUpdate();
        String qnNumber, qnDesc, optionA = "", optionB = "", optionC = "", optionD = "", isCorrect = "";
        int question_id;
        qnNumber = String.valueOf(jsonArray.getJSONObject(0).getInt("question_no"));
        qnDesc = jsonArray.getJSONObject(0).getString("question");
//        isCorrect = jsonArray.getJSONObject(0).getInt("isCorrect");
        question_id = jsonArray.getJSONObject(0).getInt("question_id");


        for(int i = 0; i<jsonArray.length(); i++){
            String temp = jsonArray.getJSONObject(i).getString("option");
            String answer = jsonArray.getJSONObject(i).getString("answer");
            int checkCorrect = jsonArray.getJSONObject(i).getInt("isCorrect");
            switch (temp){
                case "A":
                    optionA = answer;
                    if(checkCorrect == 1) isCorrect = "A";
                    break;
                case "B":
                    optionB = answer;
                    if(checkCorrect == 1) isCorrect = "B";
                    break;
                case "C":
                    optionC = answer;
                    if(checkCorrect == 1) isCorrect = "C";
                    break;
                case "D":
                    optionD = answer;
                    if(checkCorrect == 1) isCorrect = "D";
                    break;
                default:
                    break;
            }
        }
        Log.d("A: ", " " + optionA);
        Log.d("B: ", " " + optionB);
        Log.d("C: ", " " + optionC);
        Log.d("D: ", " " + optionD);

//        Toast.makeText(D_WaitingActivity.this, "Entry Success", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(E_AnswerOptionActivity.this, E_AnswerOptionActivity.class);
        intent.putExtra("qnNumberTag", qnNumber);
        intent.putExtra("qnDescTag", qnDesc);
        intent.putExtra("optionATag", optionA);
        intent.putExtra("optionBTag", optionB);
        intent.putExtra("optionCTag", optionC);
        intent.putExtra("optionDTag", optionD);
        intent.putExtra("isCorrect", isCorrect);
        intent.putExtra("question_id", question_id);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        E_AnswerOptionActivity.this.finish();
    }

    public void onFinish()
    {
        SharedPreferences prefs = getSharedPreferences("current", MODE_PRIVATE);
//                setContentView(R.layout.student_finalscore_page);
        if (selectedChoice.equals(isCorrect))
        {
            score += 1;
            Log.d("Scoreee:", String.valueOf(score));
            SharedPreferences.Editor editor = prefs.edit();

            editor.putLong("totalScore", score);
            editor.commit();
        }
        else
        {
            Log.d("Scoreee:", String.valueOf(score));
        }

        if (currentQuestion == 5) {
            quizOver();
        } else {
            httpTask.cancel(true);
            onUpdate();
            currentQuestion++;

            SharedPreferences.Editor editor = prefs.edit();

            editor.putLong("currentQuestionNo", currentQuestion);
            editor.commit();
            String url = String.format("%s/api/questions/%s/question/%d", getResources().getString(R.string.api_url), session_id, currentQuestion);
            httpTask.execute(url);

        }
    }

    private void quizOver(){
        Intent intent = new Intent(E_AnswerOptionActivity.this, F_FinalPageActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        E_AnswerOptionActivity.this.finish();
    }

    private void onUpdate(){
        httpTask = new HttpTask();
        httpTask.delegate = this;
    }

    @Override
    public void processFinish(String result) {
        JSONObject json;
        JSONArray jsonArray;
        try{
            json = new JSONObject(result);
            Log.d("JSON: ", " " + json.toString());
            if(json.getBoolean("success"))
            {
                if(json.getString("value").equals("responses")){
                    Log.d("Value: ", " ahhhhh");
//                    httpTask.cancel(true);
//                    onUpdate();
                    onFinish();
                } else {
                    jsonArray = json.getJSONArray("data");
                    if(jsonArray.length() > 0)
                    {
//                    success(jsonArray);
                        repeat(jsonArray);
                    }
                }
            }
        }
        catch (JSONException e)
        {
            Log.d("Error: ", "err: " + e.toString());
        }
//        httpTask.cancel(true);
//        onUpdate();
    }

    // Run the HTTP request in a background thread, separating from the main UI thread
    private class HttpTask extends AsyncTask<String, Void, String> {
        public AsyncResponse delegate = null;
        @Override
        protected String doInBackground(String... strURLs) {
            URL url = null;
            HttpURLConnection conn = null;
            try {
                url = new URL(strURLs[0]);
                conn = (HttpURLConnection) url.openConnection();
                // Get the HTTP response code (e.g., 200 for "OK", 404 for "Not found")
                // and pass a string description in result to onPostExecute(String result)
                int responseCode = conn.getResponseCode();
                Log.d("Code: ", " " + responseCode);
                if (responseCode == HttpURLConnection.HTTP_OK) {  // 200
                    InputStream response = conn.getInputStream();
                    BufferedReader br = new BufferedReader(new InputStreamReader(response));
                    String output = br.readLine();
                    Log.d("Results: ", "output: " + output);
                    return output;
//                    return "OK (" + responseCode + ")";
                } else {
                    return "[{Fail: " + responseCode + "}]";
                }
            } catch (IOException e) {
                return "Unable to retrieve web page. URL may be invalid.";
            }
        }

        // Displays the result of the AsyncTask.
        // The String result is passed from doInBackground().
        @Override
        protected void onPostExecute(String result) {
//            txtResponse.setText(result);  // put it on TextView
//            JSONArray jsonArr;
            delegate.processFinish(result);
        }
    }
}
