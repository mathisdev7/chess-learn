use axum::{
    http::{HeaderValue, StatusCode}, routing::{get, post}, Json, Router
};
use reqwest::Method;
use tower_http::cors::CorsLayer;
use tower::ServiceBuilder;
use serde::{Deserialize, Serialize};

#[tokio::main]
async fn main() {
    // initialize tracing
    tracing_subscriber::fmt::init();


	let cors_layer = CorsLayer::new()
		.allow_origin("http://localhost:5173".parse::<HeaderValue>().unwrap())
		.allow_methods(vec![Method::GET, Method::POST]);


    // build our application with a route
    let app = Router::new()
        .route("/", get(root))
        .route("/users", post(create_user))
		.route("/users/1", get(get_user))
		.route("/api/health", get(api_test))
		.layer(ServiceBuilder::new().layer(cors_layer));

    // run our app with hyper, listening globally on port 3000
    let listener = tokio::net::TcpListener::bind("0.0.0.0:3000").await.unwrap();
    axum::serve(listener, app).await.unwrap();
}

// basic handler that responds with a static string
async fn root() -> &'static str {
	println!("Hello, World!");
	let client = reqwest::Client::new();

	let res = client.post("http://localhost:3000/users")
		.body(r#"{ "username": "foo" }"#)
		.send()
		.await;
	print!("{:?}", res);
    "Hello, World!"
}
async fn api_test() -> (StatusCode, Json<serde_json::Value>) {
	let running = serde_json::json!({
		"status": "Server is running"
	});
	(StatusCode::OK, Json(running))
}

async fn create_user(
    // this argument tells axum to parse the request body
    // as JSON into a `CreateUser` type
    Json(payload): Json<CreateUser>,
) -> (StatusCode, Json<User>) {
    // insert your application logic here
    let user = User {
        id: 1337,
        username: payload.username,
    };

    // this will be converted into a JSON response
    // with a status code of `201 Created`
    (StatusCode::CREATED, Json(user))
}

async fn get_user() -> (StatusCode, Json<User>) {
	let user = User {
		id: 1337,
		username: "foo".to_string(),
	};

	// this will be converted into a JSON response
	// with a status code of `200 OK`
	(StatusCode::OK, Json(user))
}

// the input to our `create_user` handler
#[derive(Deserialize)]
struct CreateUser {
    username: String,
}

// the output to our `create_user` handler
#[derive(Serialize)]
struct User {
    id: u64,
    username: String,
}
