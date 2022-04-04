package com.example.clickersystem;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;
import androidx.transition.Slide;

public class B_RegisterActivity extends AppCompatActivity
{
    private Button registeracc;
    private Button backtologin;
    private EditText name, email, contact, pw, cpw;
    private String emailtext;
    private String emailPattern;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.b_student_registration_page);

        registeracc = (Button) findViewById(R.id.btnRegister);
        backtologin = (Button) findViewById(R.id.btnBackToLogin);
        name = (EditText) findViewById(R.id.nameInput);
        email = (EditText) findViewById(R.id.emailInput);
        contact = (EditText) findViewById(R.id.contactInput);
        pw = (EditText) findViewById(R.id.passwordInput);
        cpw = (EditText) findViewById(R.id.confirmpasswordInput);

        registeracc.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(B_RegisterActivity.this, A_LoginPageActivity.class);
                emailtext = email.getText().toString().trim();
                emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+";
                String pwinput = pw.getText().toString();
                String cpwinput = cpw.getText().toString();

                if(name.length() > 0 && email.length() > 0 && contact.length() > 0 && pw.length() > 0 && cpw.length() > 0)
                {
                    if (!pwinput.equals(cpwinput) && !emailtext.matches(emailPattern))
                    {
                        Toast.makeText(B_RegisterActivity.this, "Invalid email", Toast.LENGTH_SHORT).show();
                        Toast.makeText(B_RegisterActivity.this, "Passwords does not match!", Toast.LENGTH_SHORT).show();
                    }
                    else if (!emailtext.matches(emailPattern))
                    {
                        Toast.makeText(B_RegisterActivity.this, "Invalid email", Toast.LENGTH_SHORT).show();
                    }
                    else if (!pwinput.equals(cpwinput))
                    {
                        Toast.makeText(B_RegisterActivity.this, "Passwords does not match!", Toast.LENGTH_SHORT).show();
                    }
                    else if (pwinput.equals(cpwinput) && emailtext.matches(emailPattern))
                    {
                        Toast.makeText(B_RegisterActivity.this, "Registration Success!", Toast.LENGTH_SHORT).show();
                        startActivity(intent);
                    }
                }
                else
                {
                    Toast.makeText(B_RegisterActivity.this, "Please do not leave any fields empty", Toast.LENGTH_SHORT).show();
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
}
