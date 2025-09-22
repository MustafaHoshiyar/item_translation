from setuptools import setup, find_packages

with open("README.md", "r") as fh:
    long_description = fh.read()

setup(
    name="item_translation",
    version="0.1.0",
    packages=find_packages(),
    include_package_data=True,
    description="Translate Item Names in ERPNext",
    long_description=long_description,
    long_description_content_type="text/markdown",
    author="Your Name",
    install_requires=[
        "frappe",
        "googletrans==4.0.0-rc1"
    ],
    classifiers=[
        "Framework :: Frappe",
        "Programming Language :: Python :: 3"
    ],
)
