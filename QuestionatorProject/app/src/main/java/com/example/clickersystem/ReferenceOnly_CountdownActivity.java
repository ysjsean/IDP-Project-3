package com.example.clickersystem;

import android.os.Bundle;
import android.os.CountDownTimer;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class ReferenceOnly_CountdownActivity extends AppCompatActivity
{
    private TextView txtTimer;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.referenceonly_student_countdown_page);

        txtTimer = (TextView)  findViewById(R.id.timer);
        new CountDownTimer(4000, 1000) {
            public void onTick(long millisRemaining) {
                txtTimer.setText(""+millisRemaining / 1000);
            }
            public void onFinish() {
                txtTimer.setText("*Transit to next question page*");
            }
        }.start();
    }
}
