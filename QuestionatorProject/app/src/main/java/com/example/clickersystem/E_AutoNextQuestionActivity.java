package com.example.clickersystem;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class E_AutoNextQuestionActivity extends AppCompatActivity
{
    private TextView qnTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.e_student_ans_option_page);

        qnTimer = (TextView) findViewById(R.id.countdownTimer);
        new CountDownTimer(5000, 1000)
        {
            public void onTick(long millisRemaining)
            {
                qnTimer.setText("" + millisRemaining / 1000);
            }

            public void onFinish()
            {
//                setContentView(R.layout.student_finalscore_page);
                quizOver();
            }
        }.start();
    }

    private void quizOver(){
        Intent intent = new Intent(E_AutoNextQuestionActivity.this, F_FinalPageActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        E_AutoNextQuestionActivity.this.finish();
    }
}
