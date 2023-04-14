package grafosycaminos;

import java.awt.Graphics;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.event.MouseEvent;
import java.awt.event.MouseListener;
import java.util.ArrayList;
import javax.swing.JPanel;

public class Lienzo extends JPanel implements MouseListener{
    
    private ArrayList<Nodo> Nodos;
    private ArrayList<Enlace> Enlaces;
    private Point p1, p2;
    
    public Lienzo(){
        this.Nodos = new ArrayList<>(); 
        this.Enlaces = new ArrayList<>();
        this.addMouseListener(this);
    }
    
    @Override
    public void paint(Graphics g){
        for(Nodo nodos : Nodos){
            nodos.pintar(g);
        }
        for(Enlace enlace: Enlaces){
            enlace.pintar(g);
        }
    }
    
    @Override
    public void mouseClicked(MouseEvent e) {
        if(e.getButton() == MouseEvent.BUTTON1){
            this.Nodos.add(new Nodo(e.getX(), e.getY()));
            repaint();
        }
        if(e.getButton() == MouseEvent.BUTTON3){
            for(Nodo nodo : Nodos){
                if(new Rectangle(nodo.getX() - Nodo.d/2, nodo.getY() - Nodo.d/2, Nodo.d, Nodo.d).contains(e.getPoint())){
                    if(p1 == null)
                        p1 = new Point(nodo.getX(), nodo.getY());
                    else
                        p2 = new Point(nodo.getX(), nodo.getY());
                        this.Enlaces.add(new Enlace(p1.x, p1.y, p2.x, p2.y));
                        repaint();
                        p1 = null;
                        p2 = null;
                }
            }
        }
    }

    @Override
    public void mousePressed(MouseEvent e) {
    
    }

    @Override
    public void mouseReleased(MouseEvent e) {
        
    }

    @Override
    public void mouseEntered(MouseEvent e) {

    }

    @Override
    public void mouseExited(MouseEvent e) {
  
    }
    
}
