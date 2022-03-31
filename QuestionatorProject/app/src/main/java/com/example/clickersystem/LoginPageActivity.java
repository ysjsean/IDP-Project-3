package com.example.clickersystem;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class LoginPageActivity extends AppCompatActivity
{
    private Button login;
    private TextView signuphere;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.student_login_page);

        login = (Button) findViewById(R.id.btnLogin);
        signuphere = (TextView) findViewById(R.id.btnSignUpHere);

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginPageActivity.this, WaitingActivity.class);
                startActivity(intent);
            }
        });

        signuphere.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(LoginPageActivity.this, RegisterActivity.class);
                startActivity(intent);
            }
        });
    }
}
