const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const Auths = require("../modal/authSchema");
const EMAIL = process.env.EMAIL;
const PASSWORD = process.env.PASSWORD;

const authController = {};

authController.login = async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Plz Fill the data" });
    }
    const userLogin = await Auths.findOne({ email: email });

    if (!userLogin) {
      res.status(400).json({ error: "Invalid Credientials" });
    } else {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ error: "Invalid credential" });
      } else {
        const userData = await Auths.findOne({ email: email });
        console.log(userData.role);
        if (userData.role === "user") {
          const data = await Auths.findOne({ email: email })
            .select("role")
            .populate("userId");

          res.json({
            success: true,
            data,
            message: "user Signin Successfully",
          });
        } else if (userData.role === "admin") {
          const data = await Auths.findOne({ email: email })
            .select("role")
            .populate("adminId");
          res.json({
            success: true,
            data,
            message: "user Signin Successfully",
          });
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
};

authController.logout = async (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send({ success: true, message: "user logout successfully" });
};

authController.getOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const verifyEmail = await Auths.findOne({ email });
    if (verifyEmail) {
      const otpCode = Math.floor(Math.random() * 10000 + 1);
      const setOpt = await Auths.findOneAndUpdate(
        { email },
        {
          $set: {
            otp: otpCode,
            expireOtp: new Date().getTime() + 300 * 1000,
          },
        },
        { new: true, useFindAndModify: false }
      );

      // email send
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: EMAIL,
          pass: PASSWORD,
        },
      });

      const mailOptions = {
        from: "bidhan.fyp@gmail.com",
        to: `${email}`,
        subject: "login credentials",
        text: `Your OTP to reset Your password is: ${otpCode}`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent:" + info.response);
        }
      });

      res.status(200).send({
        success: true,
        setOpt,
        message: "Please check you email for OTP",
      });
    } else {
      res.status(422).send({ success: false, message: "Email Id not Matched" });
    }
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

authController.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const verifyOTP = await Auths.findOne({
      $and: [{ email: email }, { otp: otp }],
    });
    if (verifyOTP) {
      const currentTime = new Date().getTime();
      const diff = verifyOTP.expireOtp - currentTime;
      if (diff < 0) {
        res.status(422).send({ success: false, message: "OTP expire" });
      } else {
        res
          .status(200)
          .send({ success: true, message: "OTP matched", verify: "verified" });
      }
    } else {
      res.status(422).send({ success: false, message: "invalid otp" });
    }
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

authController.forgetPasswod = async (req, res) => {
  try {
    const { email, password } = req.body;

    const data = await Auths.findOneAndUpdate(
      { email },
      {
        $set: {
          password: await bcrypt.hash(password, 12),
        },
      },
      { new: true, useFindAndModify: false }
    );

    await data.save();
    res.status(200).send({ success: true, message: "Password Updated" });
  } catch (e) {
    res.status(505).send({ success: false, message: e.message });
  }
};

module.exports = authController;
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import tensorflow as tf
from tensorflow.keras.models import Model
from tensorflow.keras.layers import Input, Embedding, Flatten, Concatenate, Dense
from sklearn.metrics import mean_squared_error, mean_absolute_error
import numpy as n
# Define the path to the file
file_path = 'E:\\Thesis\\cleaned_data.csv'
# Load the CSV file
df = pd.read_csv(file_path, encoding='utf-8')

# Step 1: Handle Missing Values
df = df.dropna()

# Step 2: Remove Duplicates
df = df.drop_duplicates()

# Step 3: Convert Data Types
df['CustomerID'] = df['CustomerID'].astype(str)
df['StockCode'] = df['StockCode'].astype(str)

# Step 4: Normalize Data
df = df[df['Quantity'] > 0]
df['Quantity'] = df['Quantity'].astype(int)

# Encode the user IDs and item (StockCode) IDs
user_enc = LabelEncoder()
df['CustomerID'] = user_enc.fit_transform(df['CustomerID'])

item_enc = LabelEncoder()
df['StockCode'] = item_enc.fit_transform(df['StockCode'])

# Define the number of unique users and items
num_users = df['CustomerID'].nunique()
num_items = df['StockCode'].nunique()

# Create user-item interaction matrix
df['user_item'] = df['CustomerID'].astype(str) + "_" + df['StockCode'].astype(str)
df = df.drop_duplicates(subset=['user_item'])

# Define the target variable (rating) as the quantity purchased
df['Rating'] = df['Quantity']
# Create training and testing sets
train, test = train_test_split(df, test_size=0.2, random_state=42)

# Define the embedding size
embedding_size = 50

# Input layers
user_input = Input(shape=(1,), name='user_input')
item_input = Input(shape=(1,), name='item_input')

# Embedding layers
user_embedding = Embedding(input_dim=num_users, output_dim=embedding_size, name='user_embedding')(user_input)
item_embedding = Embedding(input_dim=num_items, output_dim=embedding_size, name='item_embedding')(item_input)

# Flatten the embeddings
user_vecs = Flatten()(user_embedding)
item_vecs = Flatten()(item_embedding)

# Concatenate user and item embeddings
collaborative_concatenated = Concatenate()([user_vecs, item_vecs])

# Add dense layers for collaborative filtering part
collab_dense_1 = Dense(128, activation='relu')(collaborative_concatenated)
collab_dense_2 = Dense(64, activation='relu')(collab_dense_1)
collab_output = Dense(1, activation='linear')(collab_dense_2)

# Add dense layers for content-based part (example: item category)
# If the dataset contains additional features like 'Category', use them here.
# For illustration, using random features.
item_category = Input(shape=(1,), name='item_category')
category_embedding = Embedding(input_dim=num_items, output_dim=embedding_size, name='category_embedding')(item_category)
category_vecs = Flatten()(category_embedding)

# Concatenate with collaborative part
hybrid_concatenated = Concatenate()([collaborative_concatenated, category_vecs])

# Add final dense layers for hybrid model
hybrid_dense_1 = Dense(256, activation='relu')(hybrid_concatenated)
hybrid_dense_2 = Dense(128, activation='relu')(hybrid_dense_1)
hybrid_output = Dense(1, activation='linear')(hybrid_dense_2)

# Create the hybrid model
model = Model([user_input, item_input, item_category], hybrid_output)
model.compile(optimizer='adam', loss='mean_squared_error')

# Prepare training data
train_category = np.random.randint(0, num_items, size=len(train))  # Example category data
test_category = np.random.randint(0, num_items, size=len(test))  # Example category data
# Train the model
history = model.fit(
    [train['CustomerID'], train['StockCode'], train_category],
    train['Rating'],
    epochs=10,
    verbose=1,
    validation_data=([test['CustomerID'], test['StockCode'], test_category], test['Rating'])
)

# Make predictions
predictions = model.predict([test['CustomerID'], test['StockCode'], test_category])

# Calculate RMSE and MAE
rmse = np.sqrt(mean_squared_error(test['Rating'], predictions))
mae = mean_absolute_error(test['Rating'], predictions)

# Calculate accuracy percentage
max_rating = df['Rating'].max()
accuracy_percentage = (1 - (rmse / max_rating)) * 100

# Save the model
model.save('E:\\Thesis\\hybrid_recommendation_model.h5')

print(f"RMSE: {rmse}")
print(f"MAE: {mae}")
print(f"Recommendation Accuracy: {accuracy_percentage:.2f}%")