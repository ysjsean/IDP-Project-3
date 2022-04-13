package com.example.Questionator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.material.textfield.TextInputEditText;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.w3c.dom.Text;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class C_EnterSessionIDActivity extends AppCompatActivity implements AsyncResponse
{
    private EditText sessionid;
    private TextInputLayout sessionidlayout;
    private TextView labelname;
    private static final String TAG = C_EnterSessionIDActivity.class.getSimpleName();
    URL target;
    HttpURLConnection conn;
    HttpTask httpTask = new HttpTask();

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.c_student_entersessionid_page);
        final SharedPreferences prefs = getSharedPreferences("profile", MODE_PRIVATE);
        String name = prefs.getString("name", "");
        if(name.equals(""))
        {
            startActivity(new Intent(this, A_LoginPageActivity.class));
        }
        else
        {
            sessionid = (EditText) findViewById(R.id.txtEnterSessionID);
            sessionidlayout = (TextInputLayout) findViewById(R.id.txtEnterSessionIDlayout);
            labelname = (TextView) findViewById(R.id.labelName);

            Intent fg = getIntent();
            String dispname = fg.getStringExtra("displayname");
            labelname.setText(name);

            httpTask.delegate = this;

            //auto detect 4-digit session ID input function//
            sessionid.addTextChangedListener(new TextWatcher() {
                @Override
                public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                }

                @Override
                public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                    Intent intent = new Intent(C_EnterSessionIDActivity.this, D_WaitingActivity.class);
                    String sessionidInputString = sessionid.getText().toString().trim();

                    int sessionidInput = 0;
                    if(sessionidInputString.length() > 0) {
                        sessionidInput = Integer.parseInt(sessionidInputString);
                        onUpdate();
                        String url = String.format("%s/api/topics/check/%d", getResources().getString(R.string.api_url), sessionidInput);
                        httpTask.execute(url);
                    }
                     // Send HTTP request
                }
                @Override
                public void afterTextChanged(Editable editable) {
                }
            });
        }
        //auto detect 4-digit session ID input function//
    }

    // Run the HTTP request in a background thread, separating from the main UI thread
    /*private class HttpTask extends AsyncTask<String, Void, String> {
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
        }*/

        // Displays the result of the AsyncTask.
        // The String result is passed from doInBackground().

        /*@Override
        protected void onPostExecute(String result) {
//            labelname.setText(result);  // put it on TextView
//            JSONArray jsonArr;
            delegate.processFinish(result);
        }*/

        /*@Override
        protected void onPostExecute(String result) {
            txtResponse.setText(result);  // put it on TextView
//            JSONArray jsonArr;
            try{
                jsonArr = new JSONArray(result);
                for(int i = 0; i < jsonArr.length(); i++){
                    Log.d(TAG, "doInBackground: " + jsonArr.getJSONObject(i).getString("answer"));
                }
//                Toast.makeText(C_EnterSessionIDActivity.this, "" + jsonArr.length(), Toast.LENGTH_SHORT).show();

            } catch (JSONException e){
                Log.d(TAG, "err: " + e);
            }
        }*/
        private void onUpdate(){
            httpTask = new HttpTask();
            httpTask.delegate = this;
        }

    private void success(String sessionid, int topic_id)
    {
        Toast.makeText(C_EnterSessionIDActivity.this, "Entry Success", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(C_EnterSessionIDActivity.this, D_WaitingActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        intent.putExtra("sessionid", sessionid);
        intent.putExtra("topic_id", topic_id);
        startActivity(intent);
        C_EnterSessionIDActivity.this.finish();
    }

    @Override
    public void processFinish(String result)
    {
        JSONObject json;
        JSONArray jsonArray;
        try{
            json = new JSONObject(result);
            if(json.getBoolean("success"))
            {
                jsonArray = json.getJSONArray("data");
                if(jsonArray.length() > 0)
                {
                    success(jsonArray.getJSONObject(0).getString("session_id"),jsonArray.getJSONObject(0).getInt("topic_id"));
                }
            }
            else
            {
                if(sessionid.length() == 4)
                {
                    sessionid.setError("Session ID does not exist");
                }
                else if(sessionid.length() > 0 && sessionid.length() < 4)
                {
                    sessionid.setError("Invalid Session ID");
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