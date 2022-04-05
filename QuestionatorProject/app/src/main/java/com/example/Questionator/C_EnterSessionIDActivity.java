package com.example.Questionator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
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

public class C_EnterSessionIDActivity extends AppCompatActivity
{
    private EditText sessionid;
    URL target;
    HttpURLConnection conn;
    private static final String TAG = C_EnterSessionIDActivity.class.getSimpleName();


    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.c_student_entersessionid_page);
//        String url = getResources().getString(R.string.api_url) + "/api/questions/5123/1";
        String url = String.format("%s/api/questions/%s/%d", getResources().getString(R.string.api_url),"5123", 1);
        new HttpTask().execute(url); // Send HTTP request
//        Toast.makeText(EnterSessionIDActivity.this, "" + url, Toast.LENGTH_SHORT).show();

//        Toast.makeText(this, "Send", Toast.LENGTH_LONG).show();

        sessionid = (EditText) findViewById(R.id.txtEnterSessionID);

        //auto detect 4-digit session ID input function//
        sessionid.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2){
                Intent intent = new Intent(C_EnterSessionIDActivity.this, D_WaitingActivity.class);
                String sessionidInput = sessionid.getText().toString().trim();

                if(sessionidInput.equals("1234"))
                {
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                    startActivity(intent);
                    C_EnterSessionIDActivity.this.finish();
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });
        //auto detect 4-digit session ID input function//
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
                Toast.makeText(C_EnterSessionIDActivity.this, "" + jsonArr.length(), Toast.LENGTH_SHORT).show();

            } catch (JSONException e){
                Log.d(TAG, "err: " + e);
            }

        }
    }
}