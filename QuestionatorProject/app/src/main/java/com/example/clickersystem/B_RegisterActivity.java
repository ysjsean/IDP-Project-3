package com.example.clickersystem;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;

public class B_RegisterActivity extends AppCompatActivity
{
    private Button registeracc;
    private Button backtologin;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.b_student_registration_page);

        registeracc = (Button) findViewById(R.id.btnRegister);
        backtologin = (Button) findViewById(R.id.btnBackToLogin);

        registeracc.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(B_RegisterActivity.this, A_LoginPageActivity.class);
                startActivity(intent);
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
