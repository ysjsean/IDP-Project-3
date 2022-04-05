package com.example.Questionator;

import android.content.Intent;
import android.graphics.drawable.AnimationDrawable;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.ScrollView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class A_LoginPageActivity extends AppCompatActivity
{
    private Button login;
    private TextView signuphere;
    private ScrollView loginBG;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.a_student_login_page);

        login = (Button) findViewById(R.id.btnLogin);
        signuphere = (TextView) findViewById(R.id.btnSignUpHere);
        loginBG = (ScrollView) findViewById(R.id.loginPage);

        AnimationDrawable animationDrawable = (AnimationDrawable) loginBG.getBackground();
        animationDrawable.setEnterFadeDuration(3000);
        animationDrawable.setExitFadeDuration(5000);
        animationDrawable.start();

        login.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(A_LoginPageActivity.this, C_EnterSessionIDActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                A_LoginPageActivity.this.finish();
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
}
