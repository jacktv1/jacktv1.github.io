<?php
namespace Api\FormValidate;

class Validate
{

    /**
     * This below methoad check validate user info,
     * validate and return each data is "valid" or "not_valid"
	 * @param {json} userInfo
	 * @return {json} userInfo
     */

    public function validateUserInfo($userInfo)
    {
    	$userInfo = json_decode($userInfo);
        echo $userInfo();
    	if (strlen($userInfo->username) < 8) {
    		$userInfo->username = "not_valid";
    	}

    	if (strlen($userInfo->password) < 8) {
    		$userInfo->password = "not_valid";
    	}

    	$emailFormat = "/^[A-Za-z0-9_]+@{1}([A-Za-z]+\.{1}[A-Za-z]+)+$/";
    	if (!preg_match($emailFormat, $userInfo->email)) {
    		$userInfo->email = "not_valid";
    	}

        $currentDay = new \DateTime();
        $currentDay->format('Y-m-d');

        $birthdayArray = explode("/",$userInfo->birthday);
        $year = $birthdayArray[2];
        $month = $birthdayArray[1];
        $day = $birthdayArray[0];

        $birthday = new \DateTime();
        $birthday->setDate($year, $month, $day);
        $birthday->format('Y-m-d');

        if (strlen($userInfo->birthday) <= 0) {
            $userInfo->birthday = "empty";
        } elseif ($birthday > $currentDay) {
            $userInfo->birthday = "not_valid";
        }

    	if (strlen($userInfo->birthday) <= 0) {
    		$userInfo->birthday = "not_valid";
    	}
    	echo json_encode($userInfo);
    }
}
