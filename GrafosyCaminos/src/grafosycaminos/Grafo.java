package grafosycaminos;
import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JMenu;
import javax.swing.JMenuBar;
import javax.swing.JMenuItem;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

public class Grafo {

    public static void main(String[] args) {
        JFrame ventana = new JFrame("Grafo");
        ventana.setSize(600, 600);
        ventana.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        // Crear el panel principal
        JPanel panelPrincipal = new JPanel();
        panelPrincipal.setLayout(new BorderLayout());

        // Crear el lienzo y agregarlo al panel principal
        Lienzo lienzo = new Lienzo();
        panelPrincipal.add(lienzo, BorderLayout.CENTER);

        // Crear el panel de botones y agregarlo al panel principal
        JPanel panelBotones = new JPanel();
        panelBotones.setLayout(new FlowLayout(FlowLayout.RIGHT));
        panelBotones.setPreferredSize(new Dimension(0, 50)); // Altura del panel de botones
        panelPrincipal.add(panelBotones, BorderLayout.SOUTH);

        // Crear el menú y agregarlo a la barra de menú
        JMenuBar menuBar = new JMenuBar();
        JMenu menu = new JMenu("Menu");

        // Crear los botones y agregarlos al menú
        JMenuItem boton1 = new JMenuItem("Botón 1");
        JMenuItem boton2 = new JMenuItem("Botón 2");
        JMenuItem boton3 = new JMenuItem("Botón 3");
        JMenuItem boton4 = new JMenuItem("Botón 4");
        menu.add(boton1);
        menu.add(boton2);
        menu.add(boton3);
        menu.add(boton4);
        menuBar.add(menu);
 
        // Agregar la barra de menú a la ventana
        ventana.setJMenuBar(menuBar);

        // Agregar los botones al panel de botones
        panelBotones.add(new JLabel("Opciones: "));
        JButton botonGenerarCaminos = new JButton("Generar Caminos");
        botonGenerarCaminos.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String inicio = JOptionPane.showInputDialog(null, "Ingrese el valor de inicio:", "Generar Caminos", JOptionPane.QUESTION_MESSAGE);
                String fin = JOptionPane.showInputDialog(null, "Ingrese el valor de fin:", "Generar Caminos", JOptionPane.QUESTION_MESSAGE);

                // Imprimir los valores ingresados en la consola para verificar
                System.out.println("Inicio: " + inicio);
                System.out.println("Fin: " + fin);
            }
        });
        panelBotones.add(botonGenerarCaminos);
        panelBotones.add(new JButton("Ayuda"));
        JButton botonSalir = new JButton("Salir");
        botonSalir.addActionListener(e -> {
        ventana.dispose(); // Cierra la ventana principal
        });
        panelBotones.add(botonSalir);
        

        // Agregar el panel principal a la ventana y mostrarla
        ventana.setContentPane(panelPrincipal);
        ventana.setVisible(true);
    }
}

