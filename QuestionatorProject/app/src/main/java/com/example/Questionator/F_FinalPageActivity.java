package com.example.Questionator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class F_FinalPageActivity extends AppCompatActivity
{
    private Button takeanotherquiz;
    private Button logout;
    private static final String TAG = F_FinalPageActivity.class.getSimpleName();

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.f_student_finalscore_page);

        takeanotherquiz = (Button) findViewById(R.id.btnTakeAnotherQuiz);
        logout = (Button) findViewById(R.id.btnLogOut);

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
                Intent intent = new Intent(F_FinalPageActivity.this, A_LoginPageActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                startActivity(intent);
                finish();
            }
        });
    }
}