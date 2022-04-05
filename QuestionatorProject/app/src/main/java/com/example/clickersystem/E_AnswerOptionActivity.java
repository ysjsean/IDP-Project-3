package com.example.clickersystem;

import android.content.Intent;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.drawable.ShapeDrawable;
import android.graphics.drawable.shapes.OvalShape;
import android.graphics.drawable.shapes.RectShape;
import android.graphics.drawable.shapes.RoundRectShape;
import android.graphics.drawable.shapes.Shape;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.MotionEvent;
import android.view.View;
import android.widget.Button;
import android.widget.ImageButton;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.shape.ShapePath;

public class E_AnswerOptionActivity extends AppCompatActivity
{
    private TextView qnTimer;
    private Button optionA;
    private Button optionB;
    private Button optionC;
    private Button optionD;

    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.e_student_ans_option_page);

        qnTimer = (TextView) findViewById(R.id.countdownTimer);
        optionA = (Button) findViewById(R.id.btnA);
        optionB = (Button) findViewById(R.id.btnB);
        optionC = (Button) findViewById(R.id.btnC);
        optionD = (Button) findViewById(R.id.btnD);

        optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
        optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
        optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
        optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));

        optionA.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionA.setBackground(getResources().getDrawable(R.color.black));
//                optionA.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderA = new ShapeDrawable();
                borderA.setShape(new RectShape());
                borderA.getPaint().setColor(Color.RED);
                borderA.getPaint().setStrokeWidth(30f);
                borderA.getPaint().setStyle(Paint.Style.STROKE);
                optionA.setBackground(borderA);*/
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design_pressed));
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));
            }
        });

        optionB.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionB.setBackground(getResources().getDrawable(R.color.black));
//                optionB.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderB = new ShapeDrawable();
                borderB.setShape(new RectShape());
                borderB.getPaint().setColor(Color.BLUE);
                borderB.getPaint().setStrokeWidth(30f);
                borderB.getPaint().setStyle(Paint.Style.STROKE);
                optionB.setBackground(borderB);*/

                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design_pressed));
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));
            }
        });

        optionC.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionC.setBackground(getResources().getDrawable(R.color.black));
//                optionC.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderC = new ShapeDrawable();
                borderC.setShape(new RectShape());
                borderC.getPaint().setColor(Color.GREEN);
                borderC.getPaint().setStrokeWidth(30f);
                borderC.getPaint().setStyle(Paint.Style.STROKE);
                optionC.setBackground(borderC);*/

                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design_pressed));
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design));
            }
        });

        optionD.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
//                optionD.setBackground(getResources().getDrawable(R.color.black));
//                optionD.setTextColor(getResources().getColor(R.color.white));
                /*ShapeDrawable borderD = new ShapeDrawable();
                borderD.setShape(new RectShape());
                borderD.getPaint().setColor(Color.YELLOW);
                borderD.getPaint().setStrokeWidth(30f);
                borderD.getPaint().setStyle(Paint.Style.STROKE);
                optionD.setBackground(borderD);*/

                optionD.setBackground(getResources().getDrawable(R.drawable.button_d_design_pressed));
                optionA.setBackground(getResources().getDrawable(R.drawable.button_a_design));
                optionB.setBackground(getResources().getDrawable(R.drawable.button_b_design));
                optionC.setBackground(getResources().getDrawable(R.drawable.button_c_design));
            }
        });

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
        Intent intent = new Intent(E_AnswerOptionActivity.this, F_FinalPageActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        E_AnswerOptionActivity.this.finish();
    }
}
