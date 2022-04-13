package com.example.Questionator;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.drawable.AnimationDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.textfield.TextInputEditText;

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

public class A_LoginPageActivity extends AppCompatActivity implements AsyncResponse
{
    private Button login;
    private TextView signuphere;
    private ScrollView loginBG;
    private TextInputEditText loginemail;
    private TextInputEditText loginpassword;
    long spuserid = 0;
    long sproleid = 0;
    String spname = null;
    String sppassword = null;
    String spemail = null;

    private static final String TAG = A_LoginPageActivity.class.getSimpleName();
    URL target;
    HttpURLConnection conn;

    HttpTask httpTask = new HttpTask();

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.a_student_login_page);

        login = (Button) findViewById(R.id.btnLogin);
        signuphere = (TextView) findViewById(R.id.btnSignUpHere);
        loginBG = (ScrollView) findViewById(R.id.loginPage);
        loginemail = (TextInputEditText) findViewById(R.id.emailInput);
        loginpassword = (TextInputEditText) findViewById(R.id.passwordInput);

        AnimationDrawable animationDrawable = (AnimationDrawable) loginBG.getBackground();
        animationDrawable.setEnterFadeDuration(5000);
        animationDrawable.setExitFadeDuration(5000);
        animationDrawable.start();

        httpTask.delegate = this;

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                String loginemailString = loginemail.getText().toString().trim();
                String loginpasswordString = loginpassword.getText().toString().trim();

                String url = String.format("%s/api/users/student/login/%s/%s", getResources().getString(R.string.api_url),loginemailString, loginpasswordString);
                httpTask.execute(url);
            }
        });

        signuphere.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(A_LoginPageActivity.this, B_RegisterActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                A_LoginPageActivity.this.finish();
            }
        });
    }

    private void onUpdate(){
        httpTask = new HttpTask();
        httpTask.delegate = this;
    }

    private void success(String username)
    {
        //Log.d("hbfgjbdg: ", "username to pass: " + username);
        Toast.makeText(A_LoginPageActivity.this, "Login Success", Toast.LENGTH_LONG).show();
        Intent intent = new Intent(A_LoginPageActivity.this, C_EnterSessionIDActivity.class);
        intent.putExtra("displayname", username);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        A_LoginPageActivity.this.finish();
    }

    public void saveAsPreference(JSONArray jsonArray) throws JSONException {
        SharedPreferences prefs = getSharedPreferences("profile", MODE_PRIVATE);
        SharedPreferences.Editor editor = prefs.edit();

        editor.putLong("userid:", jsonArray.getJSONObject(0).getLong("user_id"));
        editor.putLong("roleid:", jsonArray.getJSONObject(0).getLong("role_id"));
        editor.putString("name", jsonArray.getJSONObject(0).getString("username"));
        editor.putString("password", jsonArray.getJSONObject(0).getString("password"));
        editor.putString("email", jsonArray.getJSONObject(0).getString("email"));
        editor.commit();
    }

    @Override
    public void processFinish(String result) {
        JSONObject json;
        JSONArray jsonArray;
        try{
            json = new JSONObject(result);
            if(json.getBoolean("success")){
                jsonArray = json.getJSONArray("data");
                if(jsonArray.length() > 0) {
                    Log.d("Data: ", "doInBackground: " + jsonArray.getJSONObject(0).getString("username"));
                    saveAsPreference(jsonArray);
                    success(jsonArray.getJSONObject(0).getString("username"));
                }
//                Toast.makeText(A_LoginPageActivity.this, "Incorrect email or password", Toast.LENGTH_LONG).show();
            } else {
                Toast.makeText(A_LoginPageActivity.this, "Incorrect email or password", Toast.LENGTH_LONG).show();
            }
//                Log.d("Data: ", "doInBackground: " + json.getJSONObject(i).getString("answer"));
//                Toast.makeText(A_LoginPageActivity.this, "" + jsonArr.length(), Toast.LENGTH_SHORT).show();

        } catch (JSONException e){
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

