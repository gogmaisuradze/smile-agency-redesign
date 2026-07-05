import subprocess

def main():
    # Extract the 2nd second frame from the video
    cmd = [
        'ffmpeg', '-y', '-i', 'public/images/glass_tooth_loop.mp4',
        '-ss', '00:00:02', '-vframes', '1',
        '/Users/goga/.gemini/antigravity/brain/07fb9d45-45ba-465e-a5e5-76178540896a/video_frame.jpg'
    ]
    try:
        subprocess.run(cmd, check=True)
        print("Frame extracted successfully!")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
