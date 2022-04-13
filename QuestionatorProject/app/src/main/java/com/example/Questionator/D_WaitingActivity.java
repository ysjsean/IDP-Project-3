package com.example.Questionator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class D_WaitingActivity extends AppCompatActivity implements AsyncResponse
{
    private static final String TAG = D_WaitingActivity.class.getSimpleName();
    private Button btnClickBegin;
    URL target;
    HttpURLConnection conn;
    HttpTask httpTask = new HttpTask();

    String session_id = "";
    int topic_id = -1;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.d_student_waitingroom_page);
        httpTask.delegate = this;

        btnClickBegin = findViewById(R.id.btnClickBeginQuiz);

        if(getIntent().hasExtra("sessionid") && getIntent().hasExtra("topic_id")) {
            session_id = getIntent().getStringExtra("sessionid");
            topic_id = getIntent().getIntExtra("topic_id", -1);

            SharedPreferences prefs = getSharedPreferences("current", MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();

            editor.putLong("currentQuestionNo", 1);
            editor.putString("session_id", session_id);
            editor.putLong("totalScore",0);
            editor.commit();
        }
        String url = String.format("%s/api/questions/%s/question/%d", getResources().getString(R.string.api_url), session_id, 1);



        btnClickBegin.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                httpTask.execute(url);
            }
        });
    }

    private void onUpdate(){
        httpTask = new HttpTask();
        httpTask.delegate = this;
    }

    private void success(JSONArray jsonArray) throws JSONException {
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

        Toast.makeText(D_WaitingActivity.this, "Entry Success", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(D_WaitingActivity.this, E_AnswerOptionActivity.class);
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
        D_WaitingActivity.this.finish();
    }

    @Override
    public void processFinish(String result)
    {
        JSONObject json;
        JSONArray jsonArray;
        try{
            json = new JSONObject(result);
            Log.d("JSON: ", " " + json.toString());
            if(json.getBoolean("success"))
            {
                jsonArray = json.getJSONArray("data");
                if(jsonArray.length() > 0)
                {
                    success(jsonArray);
                }
            }
        }
        catch (JSONException e)
        {
            Log.d("Error: ", "err: " + e.toString());
        }
        httpTask.cancel(true);
        onUpdate();
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