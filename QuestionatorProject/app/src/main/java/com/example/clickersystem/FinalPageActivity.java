package com.example.clickersystem;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class FinalPageActivity extends AppCompatActivity
{
    private Button takeanotherquiz;
    private Button logout;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.student_finalscore_page);

        takeanotherquiz = (Button) findViewById(R.id.btnTakeAnotherQuiz);
        logout = (Button) findViewById(R.id.btnLogOut);

        takeanotherquiz.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(FinalPageActivity.this, WaitingActivity.class);
                startActivity(intent);
            }
        });

        logout.setOnClickListener(new View.OnClickListener()
        {
            @Override
            public void onClick(View view)
            {
                Intent intent = new Intent(FinalPageActivity.this, LoginPageActivity.class);
                startActivity(intent);
            }
        });
    }
}