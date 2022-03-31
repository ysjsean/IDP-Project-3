package com.example.clickersystem;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class EnterSessionIDActivity extends AppCompatActivity
{
    private Button enterquiz;
    private EditText sessionid;
    URL target;
    HttpURLConnection conn;
    private static final String TAG = EnterSessionIDActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.student_entersessionid_page);
//        String url = getResources().getString(R.string.api_url) + "/api/questions/5123/1";
        String url = String.format("%s/api/questions/%s/%d", getResources().getString(R.string.api_url),"5123", 1);
        new HttpTask().execute(url); // Send HTTP request
//        Toast.makeText(EnterSessionIDActivity.this, "" + url, Toast.LENGTH_SHORT).show();

//        Toast.makeText(this, "Send", Toast.LENGTH_LONG).show();

        enterquiz = (Button) findViewById(R.id.btnEnterQuiz);
        sessionid = (EditText) findViewById(R.id.txtEnterSessionID);

        enterquiz.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(EnterSessionIDActivity.this, AutoNextQuestionActivity.class);
                String sessionidInput = sessionid.getText().toString();

                if (sessionidInput.equals("1234"))
                {
                    startActivity(intent);
                }
                else
                {
                    Toast.makeText(EnterSessionIDActivity.this, "Invalid Session ID, Please try again.", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }

    // Run the HTTP request in a background thread, separating from the main UI thread
    private class HttpTask extends AsyncTask<String, Void, String> {
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
                if (responseCode == HttpURLConnection.HTTP_OK) {  // 200
                    InputStream response = conn.getInputStream();
                    BufferedReader br = new BufferedReader(new InputStreamReader(response));
                    String output = br.readLine();
                    Log.d(TAG, "output: " + output);
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
            JSONArray jsonArr;
            try{
                jsonArr = new JSONArray(result);
                for(int i = 0; i < jsonArr.length(); i++){
                    Log.d(TAG, "doInBackground: " + jsonArr.getJSONObject(i).getString("answer"));
                }
                Toast.makeText(EnterSessionIDActivity.this, "" + jsonArr.length(), Toast.LENGTH_SHORT).show();

            } catch (JSONException e){
                Log.d(TAG, "err: " + e);
            }

        }
    }
}