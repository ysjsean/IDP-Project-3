var BOSTONCONFIG = {};

// ROSTOPIC CONFIGURATIONS
// GET and SET Robot Position
BOSTONCONFIG.get_robot_pose = "gui/get_robot_pose";
BOSTONCONFIG.set_robot_pose = "gui/add_initial_pose";

// ADD / REMOVE / GET Waypoints
BOSTONCONFIG.add_waypoint = "gui/add_waypoint";
BOSTONCONFIG.remove_waypoint = "gui/remove_waypoint";
BOSTONCONFIG.get_waypoints = "gui/get_waypoints";

// GET Robot State
BOSTONCONFIG.get_battery_data = "gui/get_battery_data";
BOSTONCONFIG.get_mileage_data = "gui/get_mileage_data";
BOSTONCONFIG.get_completed_tasks = "gui/get_completed_task_num";
BOSTONCONFIG.get_total_tasks = "gui/get_total_task_num";
BOSTONCONFIG.get_motor_data = "gui/get_motor_data";
BOSTONCONFIG.get_robot_state = "gui/get_state_id";
BOSTONCONFIG.get_intruction = "gui/get_instruction";

// SET Robot State
BOSTONCONFIG.set_robot_state = "gui/set_state";

// EXECUTE / CANCEL Navigation
BOSTONCONFIG.execute_plan = "gui/execute_plan";
BOSTONCONFIG.cancel_plan = "gui/cancel_plan";

// GET Video
BOSTONCONFIG.mjpeg_video = "/rotate/image_raw";

// GET Point Cloud
BOSTONCONFIG.point_cloud = "/globalmap";

// ---------------------------------------------------------------

// ROSPARAM CONFIGURATIONS
// ROS MAP Parameters
BOSTONCONFIG.world_name = "world_name";
BOSTONCONFIG.map_name = "map_name";

// ---------------------------------------------------------------

// ROSSERVICE CONFIGURATIONS
// LAUNCH Parameters
BOSTONCONFIG.launch_navigation = "/launch_navigation";

// ---------------------------------------------------------------

// WEBSOCKET CONFIGURATIONS
BOSTONCONFIG.websocket_url = "192.168.168.105";
BOSTONCONFIG.websocket_port = ":9090";

BOSTONCONFIG.camera_position_x = "-10";
BOSTONCONFIG.camera_position_y = "25";
BOSTONCONFIG.camera_position_z = "25";
