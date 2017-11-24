package fers;

import java.util.HashSet;
import java.util.Set;

import javax.ws.rs.core.Application;
 

public class FalconEyeRestServiceApplication  extends Application {
	
	private Set<Object> singletons = new HashSet<Object>();
	 
	public FalconEyeRestServiceApplication() throws Exception {
		
		singletons.add(new FalconEyeRestService());
	}
 
	@Override
	public Set<Object> getSingletons() {
		return singletons;
	}

	@Override
	public Set<Class<?>> getClasses() {
		return null;
	}

}
