/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package grafosycaminos;

import java.awt.Graphics;

/**
 *
 * @author josia
 */
public class Nodo { 
    private int x, y;
    public static final int d = 68;
    
    public Nodo(int x, int y){
        this.x = x;
        this.y = y;
    }
    
    public void pintar(Graphics g){
        g.drawOval(this.x - d/2, this.y - d/2, d, d);   
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
    
    
}
