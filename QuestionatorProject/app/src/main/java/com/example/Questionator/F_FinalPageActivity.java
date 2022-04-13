package com.example.Questionator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.AsyncTask;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

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

public class F_FinalPageActivity extends AppCompatActivity implements AsyncResponse
{
    private Button takeanotherquiz;
    private Button logout;
    private TextView totalscore;
    private TextView lblresults;
    private static final String TAG = F_FinalPageActivity.class.getSimpleName();
    URL target;
    HttpURLConnection conn;
    HttpTask httpTask = new HttpTask();
    long score;
    int finalscore;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.f_student_finalscore_page);
        final SharedPreferences profilePrefs = getSharedPreferences("profile", MODE_PRIVATE);
        final SharedPreferences currentPrefs = getSharedPreferences("current", MODE_PRIVATE);

        totalscore = (TextView) findViewById(R.id.finalscore);
        lblresults = (TextView) findViewById(R.id.labelResultsMsg);
        takeanotherquiz = (Button) findViewById(R.id.btnTakeAnotherQuiz);
        logout = (Button) findViewById(R.id.btnLogOut);
        httpTask.delegate = this;

        score = currentPrefs.getLong("totalScore", 0);
        finalscore = (int) ((score/5.0) * 100);
        totalscore.setText(String.valueOf(finalscore) + "%");

        if (finalscore >= 50)
        {
            lblresults.setText("Congratulations! You have passed.");
        }
        else
        {
            lblresults.setText("Try harder next time!");
        }

        takeanotherquiz.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(F_FinalPageActivity.this, C_EnterSessionIDActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                F_FinalPageActivity.this.finish();
            }
        });

        logout.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                SharedPreferences.Editor editor = profilePrefs.edit();
                editor.putString("userid:","");
                editor.putString("roleid:","");
                editor.putString("name", "");
                editor.putString("password", "");
                editor.putString("email", "");
                editor.commit();

                Intent intent = new Intent(F_FinalPageActivity.this, A_LoginPageActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                F_FinalPageActivity.this.finish();
            }
        });
    }

    private void onUpdate(){
        httpTask = new HttpTask();
        httpTask.delegate = this;
    }

    private void success(String username)
    {
        Toast.makeText(F_FinalPageActivity.this, "Entry Success", Toast.LENGTH_SHORT).show();
        Intent intent = new Intent(F_FinalPageActivity.this, A_LoginPageActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        F_FinalPageActivity.this.finish();
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
                    success(jsonArray.getJSONObject(0).getString("username"));
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