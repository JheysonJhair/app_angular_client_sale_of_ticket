export interface dtoStudent{
  idStudent?: 		string,
  dni: 			    string,
  name: 			  string,
  lastName:	 	  string,
  condition:  boolean,
  school:	 		  string,
  faculty:	 		string,
  disability:	 	boolean,
  phone:	 	string,
  address:	 		string,
  sex:	 			  string,
  studentState?:	boolean,
  password?:		  string,
  mail?:	 		    string,
  code:	 		    string,
  profileImg? : string
}

export interface insertStudent{
  dni: 			    string,
  name: 			  string,
  lastName:	 	  string,
  condition:  boolean,
  school:	 		  string,
  faculty:	 		string,
  disability:	 	boolean,
  phone:	 	string,
  address:	 		string,
  sex:	 			  string,
  code:	 		    string,
}
