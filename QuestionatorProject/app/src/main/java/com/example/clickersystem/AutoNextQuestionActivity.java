package com.example.clickersystem;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class AutoNextQuestionActivity extends AppCompatActivity
{
    private TextView qnTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.student_ans_option_page);

        qnTimer = (TextView) findViewById(R.id.countdownTimer);
        new CountDownTimer(5000, 1000)
        {
            public void onTick(long millisRemaining)
            {
                qnTimer.setText("" + millisRemaining / 1000);
            }

            public void onFinish()
            {
                setContentView(R.layout.student_finalscore_page);
            }
        }.start();
    }
}
