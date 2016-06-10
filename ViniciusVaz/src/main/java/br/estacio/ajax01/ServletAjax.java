/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.estacio.ajax01;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Marcos
 */
public class ServletAjax extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet ServletAjax</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet ServletAjax at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        ;

        String nome = "<?xml version='1.0'> <root>";

        String textoTela = request.getParameter("txt_cep");
        String cep1 = ("79.080-000");
        String cep2 = ("79.032-050");
        String cep3 = ("79.814-030");

        if (cep1.equals(textoTela)) {
            nome += "<msg>"
                    + "<cep>79.080-000</cep>"
                    + "<endereco>AV. AFONSO PENA 1128</endereco>"
                    + "<bairro>CENTRO</bairro>"
                    + "<estado>MATO GROSSO DO SUL</estado>"
                    + "<cidade>CAMPO GRANDE</cidade>"
                    + "</msg>";
        } else if (cep2.equals(textoTela)) {
            nome += "<msg>"
                    + "<cep>79.032-050</cep>"
                    + "<endereco>AV. HIROSHIMA</endereco>"
                    + "<bairro>CARANDA BOSQUE</bairro>"
                    + "<estado>MATO GROSSO DO SUL</estado>"
                    + "<cidade>CAMPO GRANDE</cidade>"
                    + "</msg>";
            
        } else if (cep3.equals(textoTela)) {
            nome += "<msg>"
                    + "<cep>79.814-030</cep>"
                    + "<endereco>RUA MONTE CASTELO</endereco>"
                    + "<bairro>JD INDEPENDENCIA</bairro>"
                    + "<estado>MATO GROSSO DO SUL</estado>"
                    + "<cidade>CAMPO GRANDE</cidade>"
                    + "</msg>";

        } else {
            nome += "<msg>"
                    + "<texto> Digite CEP valido </texto>"
                    + "</msg>";

                   nome += "</root>";
        }

        response.getWriter().write(nome);
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
