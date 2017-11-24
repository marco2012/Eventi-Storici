package fers;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class StartConsumatore implements ServletContextListener {

    

    public void contextInitialized(ServletContextEvent sce) {
        try {
			Consumatore c = new Consumatore();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    public void contextDestroyed(ServletContextEvent sce){
        
    }
}

//import javax.servlet.*;
//import javax.servlet.http.HttpServlet;
//
//public class StartConsumatore extends HttpServlet{
//
//	public void init() throws ServletException
//    {
//          try {
//			Consumatore c = new Consumatore();
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//    }
//}
