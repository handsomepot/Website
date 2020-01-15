<?php
//Step1
 $db = mysqli_connect('localhost','u906139772_tingriley','database','u906139772_db')
 or die('Error connecting to MySQL server.');
?>


<html>
 <head>
 </head>
 <body>
<table>
    <thead>
		<tr>
			<th>Number</th>
			<th>Project</th>
			<th>Language</th>
			<th>Description</th>
	
		</tr>
	</thead>
	<tbody>
<?php
//Step2
$query = "SELECT * FROM project_url where 1";
mysqli_query($db, $query) or die('Error querying database.');

$result = mysqli_query($db, $query);
while ($row = mysqli_fetch_array($result)) {
 echo "<tr><td>".$row['number'] . "</td>" . "<td><a href = " . $row['url'] ." target = \"_blank\">". $row['name'] . "</a></td>" . "<td>" . $row['language'] . "</td>" . "<td>" . $row['description'] ."</td></tr>";
}

?>
<tbody>
</table>
</body>
</html>