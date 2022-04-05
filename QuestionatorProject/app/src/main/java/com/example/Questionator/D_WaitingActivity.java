package com.example.Questionator;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.widget.TextView;

public class D_WaitingActivity extends AppCompatActivity
{
    private TextView countdowntimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.d_student_waitingroom_page);

        countdowntimer = (TextView)  findViewById(R.id.timerToStart);
        new CountDownTimer(1000, 100) {
            public void onTick(long millisRemaining) {
                countdowntimer.setText(""+millisRemaining / 100);
            }
            public void onFinish()
            {
                Intent intent = new Intent(D_WaitingActivity.this, E_AnswerOptionActivity.class);
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);

                startActivity(intent);
                finish();
            }
        }.start();
    }
}