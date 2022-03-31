package com.example.clickersystem;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.widget.TextView;

public class WaitingActivity extends AppCompatActivity
{
    private TextView countdowntimer;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.student_waitingroom_page);

        countdowntimer = (TextView)  findViewById(R.id.timerToStart);
        new CountDownTimer(1000, 100) {
            public void onTick(long millisRemaining) {
                countdowntimer.setText(""+millisRemaining / 100);
            }
            public void onFinish()
            {
                Intent intent = new Intent(WaitingActivity.this, EnterSessionIDActivity.class);
                startActivity(intent);
            }
        }.start();
    }
}