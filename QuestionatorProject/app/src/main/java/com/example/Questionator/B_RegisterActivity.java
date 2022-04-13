package com.example.Questionator;

import android.content.Intent;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.graphics.LinearGradient;
import android.graphics.drawable.AnimationDrawable;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.Layout;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Toast;
import androidx.appcompat.app.AppCompatActivity;
import com.google.android.material.snackbar.Snackbar;
import com.google.android.material.textfield.TextInputLayout;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class B_RegisterActivity extends AppCompatActivity implements AsyncResponse
{
    private Button registeracc;
    private Button backtologin;
    private EditText name, email, contact, pw, cpw;
    private String emailtext;
    private String emailPattern;
    private ScrollView regBG;
    private TextInputLayout namelayout;
    private TextInputLayout emaillayout;
    private TextInputLayout contactlayout;
    private TextInputLayout pwlayout;
    private TextInputLayout cpwlayout;

    private static final String TAG = B_RegisterActivity.class.getSimpleName();
    URL target;
    HttpURLConnection conn;

    HttpTask httpTask = new HttpTask();

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        this.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);
        super.onCreate(savedInstanceState);
        setContentView(R.layout.b_student_registration_page);

        registeracc = (Button) findViewById(R.id.btnRegister);
        backtologin = (Button) findViewById(R.id.btnBackToLogin);
        name = (EditText) findViewById(R.id.nameInput);
        email = (EditText) findViewById(R.id.emailInput);
        contact = (EditText) findViewById(R.id.contactInput);
        pw = (EditText) findViewById(R.id.passwordInput);
        cpw = (EditText) findViewById(R.id.confirmpasswordInput);
        regBG = (ScrollView) findViewById(R.id.regPage);
        namelayout = (TextInputLayout) findViewById(R.id.nameLayout);
        emaillayout = (TextInputLayout) findViewById(R.id.emailLayout);
        contactlayout = (TextInputLayout) findViewById(R.id.contactLayout);
        pwlayout = (TextInputLayout) findViewById(R.id.passwordLayout);
        cpwlayout = (TextInputLayout) findViewById(R.id.confirmpasswordLayout);

        AnimationDrawable animationDrawable = (AnimationDrawable) regBG.getBackground();
        animationDrawable.setEnterFadeDuration(3000);
        animationDrawable.setExitFadeDuration(5000);
        animationDrawable.start();

        httpTask.delegate = this;

        name.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                namelayout.setError(null);
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        email.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                emaillayout.setError(null);
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        contact.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                contactlayout.setError(null);
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        pw.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                pwlayout.setError(null);
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        cpw.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                cpwlayout.setError(null);
            }

            @Override
            public void afterTextChanged(Editable editable) {
            }
        });

        registeracc.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(B_RegisterActivity.this, A_LoginPageActivity.class);
                emailtext = email.getText().toString().trim();
                emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
                String pwinput = pw.getText().toString().trim();
                String cpwinput = cpw.getText().toString().trim();
                String studentname = name.getText().toString().trim();
                String studentemail = email.getText().toString().trim();
                String studentcontact = contact.getText().toString().trim();
                String studentpw = pw.getText().toString().trim();

                if(name.length() == 0)
                {
                    namelayout.setError("Please enter your name");
                }
                else if(name.length() > 0 && name.length() < 6)
                {
                    namelayout.setError("Name should contain at least 6 characters");
                }

                if(email.length() == 0)
                {
                    emaillayout.setError("Please enter your email");
                }
                else if (email.length() > 0 && !emailtext.matches(emailPattern))
                {
                    emaillayout.setError("Invalid email format");
                }

                if(contact.length() == 0)
                {
                    contactlayout.setError("Please enter your contact number");
                }
                else if(contact.length() > 0 && contact.length() != 8)
                {
                    contactlayout.setError("Contact number should contain 8 digits");
                }
                else if((contact.getText().charAt(0) != '8' && contact.getText().charAt(0) != '9'))
                {
                    contactlayout.setError("Contact number should begin with '8' or '9'");
                }

                if(pw.length() == 0)
                {
                    pwlayout.setError("Please enter your password");
                }
                if(cpw.length() == 0)
                {
                    cpwlayout.setError("Please confirm your password");
                }
                else if(pw.length() > 0 && pw.length() < 6)
                {
                    pwlayout.setError("Password should contain at least 6 characters");
                }
                else if(pwinput.length() >= 6 && !pwinput.equals(cpwinput))
                {
                    cpwlayout.setError("Password does not match!");
                }
                else if(name.length() >= 6 && emailtext.matches(emailPattern) && contact.length() == 8) //When registration is successful
                {
                    String url = String.format("%s/api/users/student/register/%s/%s/%s/%s", getResources().getString(R.string.api_url),studentname,studentemail,studentcontact,studentpw);
                    httpTask.execute(url);
                }
            }
        });

        backtologin.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(B_RegisterActivity.this, A_LoginPageActivity.class);
                startActivity(intent);
            }
        });
    }

    private void onUpdate(){
        httpTask = new HttpTask();
        httpTask.delegate = this;
    }

    private void success(){
//        Snackbar.make(registeracc, "Registration Successful!", Snackbar.LENGTH_LONG).show();
        Toast.makeText(B_RegisterActivity.this, "Registration Successful!", Toast.LENGTH_LONG).show();
        Intent intent = new Intent(B_RegisterActivity.this, A_LoginPageActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        B_RegisterActivity.this.finish();
    }

    @Override
    public void processFinish(String result) {
        JSONObject json;
        JSONArray jsonArray;
        try{
            json = new JSONObject(result);
            if(json.getBoolean("success")){
                success();
            } else {
                Toast.makeText(B_RegisterActivity.this, "Try again", Toast.LENGTH_LONG).show();
            }
//                Log.d("Data: ", "doInBackground: " + json.getJSONObject(i).getString("answer"));
//                Toast.makeText(A_LoginPageActivity.this, "" + jsonArr.length(), Toast.LENGTH_SHORT).show();

        } catch (JSONException e){
            Log.d("Error: ", "err: " + e.toString());
        }
        httpTask.cancel(true);
        onUpdate();
    }

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
