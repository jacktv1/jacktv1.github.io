<?php
	class SessionDB {

		private $db;
		
		/*
		 * construct of class
		 */

		function __construct() {
			//set custom session functions.
			session_set_save_handler(
				array($this, 'open'), 
				array($this, 'close'), 
				array($this, 'read'), 
				array($this, 'write'), 
				array($this, 'destroy'), 
				array($this, 'gc')
			);
			register_shutdown_function('session_write_close');
		}

		/*
		 *  start session
		 *  @param $sessionName: name of session
		 *  @param $secure is true if use https
		 */

		public function startSession($sessionName, $secure) {
			//check the session cookie isn't accessable via js
			$httponly = true;
			//get a list of avaible hashes
			$sessionHash = 'sha512';
			//check if hash is available
			if (in_array($sessionHash, hash_algos())) {
				//set the has function
				ini_set('session.hash_function', $sessionHash);
				ini_set('session.hash_bits_per_character', 5);
				//force the session use cookie, not URL variable
				ini_set('session.use_only_cookie', 1);
				//get session cookie param
				$cookieParams = session_get_cookie_params();
				//set the param
				session_set_cookie_params($cookieParams["lifetime"], $cookieParams["path"], $cookieParams["domain"], $secure, $httponly);
				//change the session name
				session_name($sessionName);
				//start session
				session_start();
				//session_regenerate_id(true);
			}
		}

		/*
		 * Opening the session data store
		 */

		public function open() {
			$dbHost = "localhost";
			$dbUser = "root";
			$dbPass = "123456";
			$dbName = "demo_session";
			$conn = new MySQLi($dbHost, $dbUser, $dbPass, $dbName);
			$this->db = $conn;
			return true;
		}

		/*
		 *Closing the session data store
		 */

		public function close() {
			$this->db->close();
			return true;
		}

		/*
		 * Reading session data
		 * @param $id: is string content session id
		 * @return: data of session
		 */

		public function read($id) {
			
			$query = "SELECT session_data FROM tbl_session WHERE id = '$id' LIMIT 1";
			$result = $this->db->query($query);
			$data = $result->fetch_assoc()['session_data'];
				
		    $key = $this->getkey($id);
		    $data = $this->decrypt($data, $key);
		    return $data;
		}

		/*
		 *Writing session data
		 *encrypt the data
		 *@param $id: is id of session
		 *@param $data: is data of session
		 *return: boolean
		 */

		public function write($id, $data) {
			//get key
			$key = $this->getkey($id);
			//encrypt the data
			$data = $this->encrypt($data, $key);
			//get current time.
			$time = time();
			
			$query = "REPLACE INTO tbl_session (id, set_time, session_data, session_key) VALUES ('$id', '$time', '$data', '$key')";
			$result = $this->db->query($query);
	
			return $result;
		}

		/*
		 * get key from session table to encrypt data. If key not found, create new random key
		 * @param $id: is string id of session
		 * return the key
		 */

		public function getkey($id) {
			
			$query = "SELECT session_key FROM tbl_session WHERE id = '$id' LIMIT 1";
			$result = $this->db->query($query);
			
			if ($result->num_rows === 1) {
				$key = $result->fetch_assoc()['session_key'];
				return $key;
			} else {
				$rdKey = hash('sha512', uniqid(mt_rand(1, mt_getrandmax()), true));
				return $rdKey;
			}
		}

		/*
		 *Destroying all session data
		 *@param $id: is string
		 */

		public function destroy($id) {

			$query = "DELETE FROM tbl_session WHERE id = '$id'";
			$result = $this->db->query($query);

			return $result;
		}

		/*
		 *Cleaning out old session data	
		 */	

		public function gc($max) {

			$query = "DELETE FROM tbl_session WHERE set_time < '$old'";
			$result = $this->db->query($query);
		    return $result;
		}

		/*
		 * encrypt the data with key
		 * @param string $data: data of session
		 * @param string $key: key use encrypt
		 * return: data
		 */

		public function encrypt($data, $key) {
		    $salt = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';
		    $key = substr(hash('sha256', $salt.$key.$salt), 0, 32);
		    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
		    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
		    $encrypted = base64_encode(mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $data, MCRYPT_MODE_ECB, $iv));
		    return $encrypted;
		}

		/*
		 * decrypt the data with key
		 * @param string $data
	     * @param string $key: key was used encrypt
		 * return: data
		 */

		public function decrypt($data, $key) {
		    $salt = 'cH!swe!retReGu7W6bEDRup7usuDUh9THeD2CHeGE*ewr4n39=E@rAsp7c-Ph@pH';
		    $key = substr(hash('sha256', $salt.$key.$salt), 0, 32);
		    $iv_size = mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_ECB);
		    $iv = mcrypt_create_iv($iv_size, MCRYPT_RAND);
		    $decrypted = mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, base64_decode($data), MCRYPT_MODE_ECB, $iv);
		    return $decrypted;
		}
	}		
